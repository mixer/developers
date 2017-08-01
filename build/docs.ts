import { config } from './config';
import fetch from 'node-fetch';
import { join } from 'path';
import { forOwn, get, sortBy, isEmpty } from 'lodash';
import * as del from 'del';
import * as Bluebird from 'bluebird';
import { unlink, lstat, symlink, writeFileSync } from 'fs';
import { exec } from 'child_process';
import { loadApi } from 'raml-1-parser';
import { Gulp } from 'gulp';
import { ApiLoadingError } from "raml-1-parser/dist/raml1/highLevelAST";


const unlinkAsync: (path: string) => Bluebird<void> = <any>Bluebird.promisify(unlink);
const symlinkAsync: (to: string, from: string) => Bluebird<void> = <any>Bluebird.promisify(symlink);
const lstatAsync = Bluebird.promisify(lstat);
const execAsync = Bluebird.promisify(exec);

const now = Date.now();

/**
 * Ensures that the repo cloneable at the provided address is downloaded
 * and up-to-date.
 */
function getRepo (addr: string, branch?: string): Bluebird<void> {
    // extract everything after the last slash of the path, excluding .git:
    const name = (/\/([^/]*?)(\.git)?$/).exec(addr)[1];
    const target = join(config.src.tmp, name);
    const statPromise = lstatAsync(target);
    // We have a repo override
    if (config.repos && config.repos[name]) {
        return statPromise.tap(stats => {
            // If it's a cloned copy, ripe it
            if (!stats.isSymbolicLink() && stats.isDirectory()) {
                return del(target);
            }
            return undefined;
        })
        // if it didn't exist, ignore.
        .catch({ code: 'ENOENT' }, () => { /* do nothing */ })
        .then(stats => {
            if (!stats || !stats.isSymbolicLink()) {
                return symlinkAsync(join(__dirname, '../', config.repos[name]), target);
            }
            return undefined;
        });
    }

    return statPromise.tap(stats => {
        // Delete symbolic if present
        if (stats.isSymbolicLink()) {
            return unlinkAsync(target);
        }
        return undefined;
    })
    .tap(stats => {
        // Pull if present
        if (stats.isDirectory()) {
            return execAsync(`cd ${target} && git pull`);
        }
        return undefined;
    })
    // if the symbolic link did not exist
    .catch({ code: 'ENOENT' }, () => { /* do nothing */ })
    .then(stats => {
        if (stats && stats.isDirectory()) {
            return undefined;
        }
        const branchString = branch ? `-b ${branch}` : '';
        // Clone if not present or symbolic link was deleted.
        return execAsync(`cd ${config.src.tmp} && git clone ${branchString} ${addr}`);
    })
    .return();
}

/* RAML processing */

// The below code has been taken from
// https://github.com/raml2html/raml2html/blob/raml1.0/index.js
// and has been refactored, license must not be included.

/**
 * Parses the base url by adding the version
 */
function fixupDisplayVersion (ramlObj: any) {
  // I have no clue what kind of variables the RAML spec allows in the baseUri.
  // For now keep it super super simple.
    if (ramlObj.baseUri) {
        ramlObj.baseUri = ramlObj.baseUri.replace('{version}', ramlObj.version);
    }
}

function leftTrim (str: string, chr: string): string {
    const rgxtrim = !chr ? /^\\s+/ : new RegExp(`^${chr}+`);
    return str.replace(rgxtrim, '');
}

function makeUniqueId (resource: any) {
    const fullUrl: string = resource.parentUrl + resource.relativeUri;
    return leftTrim(fullUrl.replace(/\W/g, '_'), '_');
}

/**
 * Traverses the raml resources and adds the properties:
 *     `parentUrl`
 *     `uniqueId`
 *     `allUriParameters`
 */
function traverseResources (ramlObj: any, parentUrl = '', allUriParameters?: string[]) {
    // Add unique id's and parent URL's plus parent URI parameters to resources
    forOwn(ramlObj.resources, resource => {
        resource.parentUrl = parentUrl;
        resource.uniqueId = makeUniqueId(resource);
        resource.allUriParameters = [];

        if (allUriParameters) {
            resource.allUriParameters.push.apply(resource.allUriParameters, allUriParameters);
        }

        if (resource.uriParameters) {
            forOwn(resource.uriParameters, parameters => {
                resource.allUriParameters.push(parameters);
            });
        }

        if (resource.methods) {
            forOwn(resource.methods, method => {
                method.allUriParameters = resource.allUriParameters;
            });
        }
        traverseResources(
            resource,
            resource.parentUrl + resource.relativeUri,
            resource.allUriParameters
        );
    });
}

/**
 * Flattens types into name: type associative object
 */
function transverseTypes (types: { [key: string]: any }[]): { [key: string]: any } {
    return Object.assign({}, ...types);
}

/**
 * Adds unique ids to each segment.
 */
function addUniqueIdsToDocs (ramlObj: any) {
    // Add unique id's to top level documentation chapters
    forOwn(ramlObj.documentation, docSection => {
        docSection.uniqueId = docSection.title.replace(/\W/g, '-');
    });
}

/**
 * Filters all sub trees that have the `internal` annotation.
 */
function filterRaml (node: any[] | any): any {
    const isArr = Array.isArray(node);
    const ret: any = isArr ? [] : {};
    const add = (key: string, value: any) => {
        if (isArr) {
            ret.push(value);
            return;
        }
        ret[key] = value;
    };

    forOwn(node, (subNode, index) => {
        if (typeof subNode !== 'object' || subNode === null) {
            add(index, subNode);
            return;
        }

        const annotations = subNode.annotations;
        const embargo: string = get(annotations, 'embargo.structuredValue');
        if (embargo && new Date(embargo).getTime() > now) {
            return;
        }
        if (annotations && annotations.internal) {
            return;
        }
        const newSubNode = filterRaml(subNode);
        // After filtering nodes may be empty
        if (isEmpty(newSubNode)) {
            return;
        }
        add(index, newSubNode);
    });
    return ret;
}

/**
 * Makes the raml object more usable.
 */
function enhanceRamlObj (ramlObj: any) {
    const newRaml = filterRaml(ramlObj);
    fixupDisplayVersion(newRaml);
    traverseResources(newRaml);
    newRaml.types = transverseTypes(newRaml.types);
    addUniqueIdsToDocs(newRaml);
    return newRaml;
}

/**
 * Registers a task that compiles
 */
export function task(gulp: Gulp) {
    gulp.task('java-clone', () => getRepo('git@github.com:WatchBeam/beam-client-java.git'));

    gulp.task('java-mvn-gen', ['java-clone'], (callback) => {
        exec(
            `cd ${config.src.tmp}/beam-client-java && mvn clean javadoc:javadoc`,
            { maxBuffer: 1024 * 1024 * 10 },
            callback
        );
    });
    gulp.task('java-doc', ['java-mvn-gen'], () => {
        return gulp.src(join(config.src.tmp, 'beam-client-java/target/site/**/*'))
        .pipe(gulp.dest(config.dist.javadoc));
    });

    gulp.task('backend-clone', () => getRepo('git@github.com:WatchBeam/backend.git', 'master'));

    gulp.task('backend-doc', ['backend-clone'], () => {
        let docPath;
        if (config.backendRamlPath) {
            docPath = join(config.backendRamlPath, 'index.raml');
        } else {
            docPath = join(config.src.tmp, 'backend/doc/raml/index.raml');
        }
        return loadApi(docPath, {
            rejectOnErrors: true,
        })
        .catch((error: ApiLoadingError) => {
            if (error.parserErrors) {
                const stack = error.parserErrors
                .map(({ message, range, path }, idx) => {
                    return `${idx + 1}: ${path}@${range.start.line}:${range.start.column} ${message}`;
                })
                .join('\n');
                error.message += `\n${stack}`;
            }

            throw error;
        })
        .then(api => {
            const tree = enhanceRamlObj(api.expand().toJSON());
            writeFileSync(
                join(config.src.tmp, 'raml-doc.json'),
                JSON.stringify(tree)
            );
        });
    });

    gulp.task('pull-client-repos', () => {
        const todo = (<{
            language: string;
            name: string;
            alias: string;
            official: boolean;
        }[]>require('./libraries'))
        .map(lib => {
            return fetch(`https://api.github.com/repos/${lib.name}`)
            .then(response => {
                if (response.status !== 200) {
                    throw new Error(
                        `Errorful response getting ${lib.name}: ${response.statusText}`
                    );
                }
                return response.json();
            })
            .then(json => ({
                language: lib.language,
                official: lib.official,
                name: lib.alias || lib.name.split('/').pop(),
                updatedAt: new Date(json.pushed_at).toDateString(),
                stars: json.stargazers_count,
                url: json.html_url,
            }));
        });

        return Promise.all(todo)
        .then(result => {
            writeFileSync(
                join(config.src.tmp, 'libraries.json'),
                JSON.stringify(sortBy(result, 'language'), null, '   ')
            );
        });
    });
};

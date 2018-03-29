'use strict';


const config = require('config');
const fetch = require('node-fetch');
const path = require('path');
const _ = require('lodash');
const Bluebird = require('bluebird');
const del = require('del');

const fs = Bluebird.promisifyAll(require('fs'));
const childProcess = Bluebird.promisifyAll(require('child_process'));

// Function which returns the raml parser. We don't load this on require-time
// since it has a lot of dependencies and slows down development builds when
// unneeded.
const ramlParser = () => require('raml-1-parser');

const now = Date.now();

/**
 * Ensures that the repo cloneable at the provided address is downloaded
 * and up-to-date.
 * @param  {String} addr
 * @param  {String} branch Name of the branch to clone
 * @return {Promise}
 */
function getRepo (addr, branch) {
    // extract everything after the last slash of the path, excluding .git:
    const name = (/\/([^/]*?)(\.git)?$/).exec(addr)[1];
    const target = path.join(config.src.tmp, name);
    const statPromise = fs.lstatAsync(target);
    // We have a repo override
    if (config.repos && config.repos[name]) {
        return statPromise.tap(stats => {
            // If it's a cloned copy, ripe it
            if (!stats.isSymbolicLink() && stats.isDirectory()) {
                return del(target);
            }
        })
        // if it didn't exist, ignore.
        .catch({ code: 'ENOENT' }, () => { /* do nothing */ })
        .then(stats => {
            if (!stats || !stats.isSymbolicLink()) {
                return fs.symlinkAsync(path.join(__dirname, '../', config.repos[name]), target);
            }
        });
    }

    return statPromise.tap(stats => {
        // Delete symbolic if present
        if (stats.isSymbolicLink()) {
            return fs.unlinkAsync(target);
        }
    })
    .tap(stats => {
        // Pull if present
        if (stats.isDirectory()) {
            return childProcess.execAsync(`cd ${target} && git pull`);
        }
    })
    // if the symbolic link did not exist
    .catch({ code: 'ENOENT' }, () => { /* do nothing */ })
    .then(stats => {
        if (stats && stats.isDirectory()) {
            return;
        }
        const branchString = branch ? `-b ${branch}` : '';
        // Clone if not present or symbolic link was deleted.
        return childProcess.execAsync(`cd ${config.src.tmp} && git clone ${branchString} ${addr}`);
    });
}


/**
 * @callback RAMLTraverseCallback
 * @param {Resource|Method} resource The current resource or method
 * @param {Boolean} isMethod Indicates if node is a method.
 * keep in mind that methods are 'leaves' and have no children.
 * @return {Boolean} If falsy, the entire resource and subresources will be
 * discarded.
 */


/* RAML processing */

// The below code has been taken from
// https://github.com/raml2html/raml2html/blob/raml1.0/index.js
// and has been refactored, license must not be included.

/**
 * Parses the base url by adding the version
 * @param  {RamlJSONObject} ramlObj
 */
function fixupDisplayVersion (ramlObj) {
  // I have no clue what kind of variables the RAML spec allows in the baseUri.
  // For now keep it super super simple.
    if (ramlObj.baseUri) {
        ramlObj.baseUri = ramlObj.baseUri.replace('{version}', ramlObj.version);
    }
}

function leftTrim (str, chr) {
    const rgxtrim = !chr ? /^\\s+/ : new RegExp(`^${chr}+`);
    return str.replace(rgxtrim, '');
}

function makeUniqueId (resource) {
    const fullUrl = resource.parentUrl + resource.relativeUri;
    return leftTrim(fullUrl.replace(/\W/g, '_'), '_');
}

/**
 * Traverses the raml resources and adds the properties:
 *     `parentUrl`
 *     `uniqueId`
 *     `allUriParameters`
 * @param  {RamlObject} ramlObj
 * @param  {String} parentUrl
 * @param  {string[]} allUriParameters
 */
function traverseResources (ramlObj, parentUrl = '', allUriParameters) {
    // Add unique id's and parent URL's plus parent URI parameters to resources
    _.forOwn(ramlObj.resources, resource => {
        resource.parentUrl = parentUrl;
        resource.uniqueId = makeUniqueId(resource);
        resource.allUriParameters = [];

        if (allUriParameters) {
            resource.allUriParameters.push.apply(resource.allUriParameters, allUriParameters);
        }

        if (resource.uriParameters) {
            _.forIn(resource.uriParameters, parameters => {
                resource.allUriParameters.push(parameters);
            });
        }

        if (resource.methods) {
            _.forIn(resource.methods, method => {
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
 * @param  {Types[]} types
 * @return {{string:Type}}
 */
function transverseTypes (types) {
    const newTypes = {};
    types.forEach(type => _.assign(newTypes, type));
    return newTypes;
}

/**
 * Adds unique ids to each segment.
 * @param {RAMLJSONObject} ramlObj
 */
function addUniqueIdsToDocs (ramlObj) {
    // Add unique id's to top level documentation chapters
    _.forEach(ramlObj.documentation, docSection => {
        docSection.uniqueId = docSection.title.replace(/\W/g, '-');
    });
}

/**
 * Filters all sub trees that have the `internal` annotation.
 * @param  {RamlObject} node
 */
function filterRaml (node) {
    const isArr = _.isArray(node);
    const ret = isArr ? [] : {};
    const add = (key, value) => {
        if (isArr) {
            ret.push(value);
            return;
        }
        ret[key] = value;
    };

    _.forOwn(node, (subNode, index) => {
        if (typeof subNode !== 'object' || subNode === null) {
            add(index, subNode);
            return;
        }

        const annotations = subNode.annotations;
        const embargo = _.get(annotations, 'embargo.structuredValue');
        if (embargo && new Date(embargo).getTime() > now) {
            return;
        }
        if (!config.includeInternal && annotations && annotations.internal) {
            return;
        }
        const newSubNode = filterRaml(subNode);
        // After filtering nodes may be empty
        if (_.isEmpty(newSubNode)) {
            return;
        }
        add(index, newSubNode);
    });
    return ret;
}

/**
 * Makes the raml object more usable.
 * @param  {RAMLJSONObject} ramlObj
 */
function enhanceRamlObj (ramlObj) {
    const newRaml = filterRaml(ramlObj);
    fixupDisplayVersion(newRaml);
    traverseResources(newRaml);
    newRaml.types = transverseTypes(newRaml.types);
    addUniqueIdsToDocs(newRaml);
    return newRaml;
}

/**
 * Registers a task that compiles
 * @param  {Gulp} gulp
 * @param  {Object} $ plugin loader
 * @return {Stream}
 */
module.exports = (gulp) => {
    gulp.task('backend-clone', () => getRepo('git@github.com:mixer/backend.git', 'master'));

    gulp.task('backend-doc', ['backend-clone'], () => {
        let docPath;
        if (config.backendRamlPath) {
            docPath = path.join(config.backendRamlPath, 'index.raml');
        } else {
            docPath = path.join(config.src.tmp, 'backend/doc/raml/index.raml');
        }
        return ramlParser().loadApi(docPath, {
            rejectOnErrors: true,
        })
        .catch(error => {
            if (error.parserErrors) {
                const stack = error.parserErrors
                .map((err, idx) => {
                    return `${idx + 1}: ${err.path}@${err.line}:${err.column} ${err.message}`;
                })
                .join('\n');
                error.message += `\n${stack}`;
            }

            throw error;
        })
        .then(api => {
            const tree = enhanceRamlObj(api.expand().toJSON());
            fs.writeFileSync(
                path.join(config.src.tmp, 'raml-doc.json'),
                JSON.stringify(tree)
            );
        });
    });

    gulp.task('pull-client-repos', () => {
        const todo = require('./libraries')
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
            fs.writeFileSync(
                path.join(config.src.tmp, 'libraries.json'),
                JSON.stringify(_.sortBy(result, 'language'), null, '   ')
            );
        });
    });
};

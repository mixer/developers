import { GulpPlugins } from 'gulp-load-plugins';
import { highlightAuto, highlight } from 'highlight.js';
import { config } from './config';
import * as marked from 'marked';
import { STATUS_CODES } from 'http';
import { join } from 'path';
import { readFileSync, writeFileSync } from 'fs';
import { find } from 'lodash';
import { orderObject } from './util';
import { Gulp } from "gulp";

/**
 * Reads a json file, if there is a problem reading
 * the file it returns null.
 */
function readJSONFile<T>(filePath: string): T {
    try {
        return JSON.parse(readFileSync(filePath, 'utf8'));
    } catch (e) {
        return null;
    }
}

/**
 * Wraps a require so that if there is a problem reading
 * the file it returns null.
 */
function wrappedRequire<T>(filePath: string): T | null {
    try {
        return require(filePath);
    } catch (e) {
        return null;
    }
}

/**
 * Generates locals required for templating.
 * `permissions` is used for the REST API docs, they are displayed in a table.
 * @return {Object}
 */
function getLocals () {
    // It's complicated.
    const restDoc: any = readJSONFile(join(__dirname, '/tmp/raml-doc.json'));
    marked.setOptions({
        highlight (code) {
            return highlightAuto(code).value;
        },
    });

    const permissions = require('@mcph/beam-common').permissions;
    const permissionKeys = Object.keys(permissions).sort();
    const out = {
        orderObject,
        // eslint-disable-next-line no-console
        log: console.log,
        marked,
        libraries: require('./tmp/libraries'), // eslint-disable-line import/no-unresolved
        liveEvents: require('../src/reference/constellation/events'),
        chat: require('../src/reference/chat/data'),
        cClients: {
            cpp: require('../src/reference/interactive/cplusplus/data.json').api,
            csharp: require('../src/reference/interactive/csharp/data.json').api,
        },
        rest: restDoc,
        beConfig: wrappedRequire('./tmp/backend/config/default.js'),
        permissions,
        permissionKeys,
        bsTabs: {},
        highlight(lang: string, str: string): string {
            if (lang === 'text') {
                return str;
            }
            return highlight(lang, str).value
                .replace('AUTH_TOKEN', '<a class="auth-token">Click here to get your Token!</a>');
        },
        readFile(file: string): string {
            return readFileSync(join(__dirname, '../src', file), 'utf8');
        },
        restUtil: {
            /**
             * Finds and extracts a trait definition from the `is` property of a method.
             */
            getTraitInfo (method: any, type: string): any {
                const temp = find<any>(method.is, value => value[type]);
                return temp && temp[type];
            },
            /**
            * Get the root type of a type.
            * This is one of the types:
            * Object: 'Object'
            * Scalars: 'string', 'number', 'integer', 'boolean', 'date', 'file', 'scalar'
            */
            getRootType (type: any): string {
                if (type.type.length > 1) {
                    // Multiple inheritence is only supported for object types.
                    return 'object';
                }

                const parent = type.type[0];
                if (restDoc.types && restDoc.types[parent]) {
                    return this.getRootType(restDoc.types[parent]);
                }

                return type.type[0];
            },
            /**
             * Checks if the type is a raml primitive.
             */
            isChildType (type: string): boolean {
                return (
                    type === 'string' ||
                    type === 'number' ||
                    type === 'integer' ||
                    type === 'boolean' ||
                    type === 'string' ||
                    type === 'date' ||
                    type === 'file' ||
                    type === 'scalar'
                );
            },
            isBaseType (type: string): boolean {
                return type === 'object' || type === 'type' || this.isChildType(type);
            },
            securitySchemeWithName (name: string | any): any {
                if (name && name.oauth_2_0) {
                    // oauth_2_0 is a special snowflake if it has scopes :>
                    name = 'oauth_2_0';
                }
                return find<any>(restDoc.securitySchemes, scheme => scheme[name])[name];
            },
            isSecurityOAuth (security: any): boolean {
                return !!security.oauth_2_0;
            },
            hasOAuthScopes (security: any): boolean {
                return security.oauth_2_0.scopes.some((scope: any[]) => scope.length > 0);
            },
            getOAuthScopes (security: any): string[] {
                return security.oauth_2_0.scopes;
            },
            /**
             * Attempts to look up an HTTP status message corresponding
             * to the provided numeric code.
             */
            getStatusMessage (code: number): string {
                return STATUS_CODES[code];
            },
            /**
             * Special handling for property names that have non alphanumeric names
             * such as regex wildcards and `//`.
             */
            prettifyPropertyName (name: string): string {
                if (name === '//') {
                    return 'All keys';
                }
                if (name.startsWith('/') && name.endsWith('/')) {
                    return `Keys matching the RegEx ${name}`;
                }
                return name;
            },
        },
    };

    return out;
}

/**
 * Returns an object of options for Pug compilation.
 * @return {Object}
 */
function getPugOpts () {
    return {
        locals: getLocals(),
        pretty: !config.minify,
    };
}


/**
 * Registers a task that compiles
 * @param  {Gulp} gulp
 * @param  {Object} $ plugin loader
 * @return {Stream}
 */
export function task (gulp: Gulp, $: GulpPlugins) {
    gulp.task('html', ['html-raml']);

    gulp.task('html-raml', ['backend-doc', 'pull-client-repos'], () => {
        return gulp.src(config.src.html)
        .pipe($.pug(getPugOpts()))
        .pipe($.if(config.minify, $.minifyHtml()))
        .pipe(gulp.dest(config.dist.html));
    });

    gulp.task('html-quick', () => {
        return gulp.src(config.src.html)
        .pipe($.pug(getPugOpts()))
        .pipe($.if(config.minify, $.minifyHtml()))
        .pipe(gulp.dest(config.dist.html));
    });

    gulp.task('images', () => {
        return gulp.src(config.src.images)
        .pipe($.if(config.minify,
            $.if('*.{jpg,svg,png,gif}', $.imagemin())))
        .pipe(gulp.dest(config.dist.images));
    });

    gulp.task('js', () => {
        return gulp.src(config.src.js)
        .pipe($.concat('developers.js'))
        .pipe($.if(config.minify, $.uglify())
            .on('error', (err: Error) => {
                if (err instanceof $.uglify.GulpUglifyError) {
                    // Reprocess magic uglify errors
                    const { cause } = err;
                    cause.message = `${cause.filename}:${cause.line}:${cause.col} ${cause.message}`;
                    throw cause;
                }
                throw err;
            })
        )
        .pipe(gulp.dest(config.dist.js));
    });

    gulp.task('lint-json', () => {
        const files = [
            'src/reference/chat/data.json',
            'src/reference/interactive/cplusplus/data.json',
            'src/reference/interactive/csharp/data.json',
        ];

        files.forEach(file => {
            const contents = JSON.parse(readFileSync(file, 'utf8'));
            const transformed = JSON.stringify(contents, null, '  ');
            if (contents === transformed) {
                return;
            }
            writeFileSync(file, `${transformed}\n`);
        });
    });
};

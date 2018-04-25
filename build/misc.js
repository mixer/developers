'use strict';

const highlight = require('highlight.js');
const config = require('config');
const marked = require('marked');
const http = require('http');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const orderObject = require('./util').orderObject;

/**
 * Reads a json file, if there is a problem reading
 * the file it returns null.
 * @param  {String} filePath
 * @return {Object}
 */
function readJSONFile (filePath) {
    try {
        return JSON.parse(fs.readFileSync(filePath));
    } catch (e) {
        return null;
    }
}

/**
 * Wraps a require so that if there is a problem reading
 * the file it returns null.
 * @param {String} filePath
 * @return {Object}
 */
function wrappedRequire (filePath) {
    try {
        return require(filePath);
    } catch (e) {
        return null;
    }
}

/**
 * Returns the array of permissions to be shown on the OAuth section of the docs.
 * @return {Object[]}
 */
function getPermissions () {
    try {
        return require('@mcph/beam-common').permissions;
    } catch (err) {
        if (err.code === 'MODULE_NOT_FOUND') {
            // eslint-disable-next-line no-console
            console.warn('Cannot find common module. OAuth scope table will be omitted.');
            return [];
        }
        throw err;
    }
}

/**
 * Generates locals required for templating.
 * `permissions` is used for the REST API docs, they are displayed in a table.
 * @return {Object}
 */
function getLocals () {
    const restDoc = readJSONFile(path.join(__dirname, '/tmp/raml-doc.json'));
    marked.setOptions({
        highlight (code) {
            return require('highlight.js').highlightAuto(code).value;
        },
    });

    const permissions = getPermissions();
    const permissionKeys = Object.keys(permissions).sort();
    const out = {
        _,
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
        highlight: (lang, str) => {
            if (lang === 'text') return str;
            return highlight.highlight(lang, str).value
                .replace('AUTH_TOKEN', '<a class="auth-token">Click here to get your Token!</a>');
        },
        readFile: (file) => fs.readFileSync(path.join(__dirname, '../src', file)),

        restUtil: {
            /**
             * Finds and extracts a trait definition from the `is` property of a method.
             * @param  {Object} method
             * @param  {String} type
             * @return {Object?}
             */
            getTraitInfo (method, type) {
                const temp = _.find(method.is, value => value[type]);
                return temp && temp[type];
            },
            /**
            * Get the root type of a type.
            * This is one of the types:
            * Object: 'Object'
            * Scalars: 'string', 'number', 'integer', 'boolean', 'date', 'file', 'scalar'
            */
            getRootType (type) {
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
             * @param  {String}  type
             * @return {Boolean}
             */
            isChildType (type) {
                const buildinTypes = [
                    'string',
                    'number',
                    'integer',
                    'boolean',
                    'date',
                    'file',
                    'scalar',
                ];
                return _.includes(buildinTypes, type);
            },
            isBaseType (type) {
                return type === 'object' || type === 'type' || this.isChildType(type);
            },
            securitySchemeWithName (name) {
                if (name && name.oauth_2_0) {
                    // oauth_2_0 is a special snowflake if it has scopes :>
                    name = 'oauth_2_0';
                }
                return _.find(restDoc.securitySchemes, scheme => scheme[name])[name];
            },
            isSecurityOAuth (security) {
                return !!security.oauth_2_0;
            },
            hasOAuthScopes (security) {
                return security.oauth_2_0.scopes.filter(scope => scope.length).length > 0;
            },
            getOAuthScopes (security) {
                return security.oauth_2_0.scopes;
            },
            /**
             * Attempts to look up an HTTP status message corresponding
             * to the provided numeric code.
             * @param  {Number} code
             * @return {String}
             */
            getStatusMessage (code) {
                return http.STATUS_CODES[code];
            },
            /**
             * Special handling for property names that have non alphanumeric names
             * such as regex wildcards and `//`.
             * @param  {String} name
             * @return {String}
             */
            prettifyPropertyName (name) {
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
 * @param  {Object} flags additional build flags
 * @return {Stream}
 */
module.exports = (gulp, $, flags) => {
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
        .pipe($.if(config.minify, $.uglify()).on('error', err => {
            if (err instanceof $.uglify.GulpUglifyError) {
                const { cause } = err;
                cause.message = `${cause.filename}:${cause.line}:${cause.col} ${cause.message}`;
                throw cause;
            }
            throw err;
        }))
        .pipe(gulp.dest(config.dist.js));
    });

    gulp.task('lint-json', () => {
        const files = [
            'src/reference/chat/data.json',
            'src/reference/interactive/cplusplus/data.json',
            'src/reference/interactive/csharp/data.json',
        ];

        files.forEach(file => {
            const contents = JSON.parse(fs.readFileSync(file, 'utf8'));
            const transformed = JSON.stringify(contents, null, '  ');
            if (contents === transformed) {
                return;
            }
            fs.writeFileSync(file, `${transformed}\n`);
        });
    });

    gulp.task('set-internal', () => {
        flags.internal = true;
    });
};

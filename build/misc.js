'use strict';

const highlight = require('highlight.js');
const config = require('config');
const marked = require('marked');
const http = require('http');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');

/**
 * Generates locals required for templating.
 * `permissions` is used for the REST API docs, they are displayed in a table.
 * @return {Object}
 */
function getLocals () {
    const restDoc = require('./tmp/raml-doc.json');
    marked.setOptions({
        highlight (code) {
            return require('highlight.js').highlightAuto(code).value;
        },
    });

    const out = {
        marked,
        libraries: require('./tmp/libraries'),
        liveEvents: require('../src/reference/liveloading/events'),
        chat: require('../src/reference/chat/data'),
        rest: require('./tmp/raml-doc.json'),
        permissions: require('@mcph/beam-common').permissions,
        highlight: (lang, str) => highlight.highlight(lang, str).value,
        readFile: (file) => fs.readFileSync(path.join(__dirname, '../src', file)),

        restUtil: {
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
        log: console.log,
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
module.exports = (gulp, $) => {
    gulp.task('html', ['backend-doc', 'pull-client-repos'], () => {
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
        .pipe($.if(config.minify, $.uglify()))
        .pipe(gulp.dest(config.dist.js));
    });
};

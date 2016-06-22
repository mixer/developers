'use strict';

const config = require('config');

/**
 * Generates locals required for templating.
 * `permissions` is used for the REST API docs, they are displayed in a table.
 * @return {Object}
 */
function getLocals() {
    const restDoc = require('./tmp/raml-doc.json');
    const out = {
        highlight: require('highlight.js'),
        marked: require('marked'),
        rest: require('./tmp/raml-doc.json'),
        permissions: { 'some:test': { text: 'Text description' } },

        restUtil: {
            /**
            * Get the root type of a type.
            * This is one of the types:
            * Object: 'Object'
            * Scalars: 'string', 'number', 'integer', 'boolean', 'date', 'file', 'scalar'
            */
            getRootType(type) {
                if (type.type.length > 1) {
                    // Multiple inheritence is only supported for object types.
                    return 'object';
                }

                if (restDoc.types) {
                    const parent = type.type[0];
                    for (const type2 of restDoc.types) {
                        if (typeof type2[parent] !== 'undefined') {
                            return this.getRootType(type2[parent]);
                        }
                    }
                }

                return type.type[0];
            },
            /**
             * Checks if the type is a raml primitive.
             * @param  {String}  type
             * @return {Boolean}
             */
            isChildType(type) {
                const buildinTypes = ['string', 'number', 'integer', 'boolean', 'date', 'file', 'scalar'];
                return _.includes(buildinTypes, type);
            },
            securitySchemeWithName(name) {
                if (name && name.oauth_2_0) {
                    // oauth_2_0 is a special snowflake if it has scopes :>
                    name = 'oauth_2_0';
                }
                return _.find(restDoc.securitySchemes, scheme => scheme[name])[name];
            },
            isSecurityOAuth(security) {
                return !!security.oauth_2_0;
            },
            getOAuthScopes(security) {
                return security.oauth_2_0.scopes;
            },
        },
    };

    let common;
    try {
        out.permissions = require('@mcph/beam-common').permissions;
    } catch (e) {
        console.warn('@mcph/beam-common not installed, using dummy fixtures...');
    }

    return out;
}

/**
 * Returns an object of options for Pug compilation.
 * @return {Object}
 */
function getPugOpts() {
    return {
        locals: getLocals(),
        pretty: !config.minify
    };
}

/**
 * Registers a task that compiles
 * @param  {Gulp} gulp
 * @param  {Object} $ plugin loader
 * @return {Stream}
 */
module.exports = (gulp, $) => {

    gulp.task('html', ['backend-doc'], () => {
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
        .pipe($.if(config.minify, $.uglify()))
        .pipe(gulp.dest(config.dist.js));
    });
};

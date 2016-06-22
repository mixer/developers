'use strict';

const config = require('config');

/**
 * Generates locals required for templating.
 * `permissions` is used for the REST API docs, they are displayed in a table.
 * @return {Object}
 */
function getLocals() {
    const out = {
        permissions: { 'some:test': { text: 'Text description' }},
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
 * Registers a task that compiles
 * @param  {Gulp} gulp
 * @param  {Object} $ plugin loader
 * @return {Stream}
 */
module.exports = (gulp, $) => {

    gulp.task('html', ['backend-doc'], () => {
        return gulp.src(config.src.html)
        .pipe($.pug({ locals: getLocals() }))
        .pipe(gulp.dest(config.dist.html));
    });

    gulp.task('html-quick', () => {
        return gulp.src(config.src.html)
        .pipe($.pug({ locals: getLocals() }))
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

'use strict';

const path = require('path');

const config = require('config');
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const flags = {
    internal: false,
};

require('./build/docs')(gulp, $, flags);
require('./build/misc')(gulp, $, flags);
require('./build/css')(gulp, $, flags);

const defaultTasks = ['html', 'js', 'css', 'images'];

gulp.task('default', gulp.series(defaultTasks));
gulp.task('internal', gulp.series(['set-internal', ...defaultTasks]));
gulp.task('recompile', gulp.series(['html-quick', 'js', 'css', 'images']));

gulp.task('watch', () => {
    gulp.watch('src/css/**/*.less', gulp.series(['css']));
    gulp.watch(config.src.html, gulp.series(['html-quick']));
    gulp.watch(config.src.snippets, gulp.series(['html-quick']));
    gulp.watch(config.src.js, gulp.series(['js']));
    if (config.repos && config.repos.backend) {
        gulp.watch(path.join(config.repos.backend, '**/*.raml'), gulp.series(['html-raml']));
    }
});

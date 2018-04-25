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

gulp.task('default', defaultTasks);
gulp.task('internal', ['set-internal', ...defaultTasks]);
gulp.task('recompile', ['html-quick', 'js', 'css', 'images']);

gulp.task('watch', () => {
    gulp.watch('src/css/**/*.less', ['css']);
    gulp.watch(config.src.html, ['html-quick']);
    gulp.watch(config.src.snippets, ['html-quick']);
    gulp.watch(config.src.js, ['js']);
    if (config.repos && config.repos.backend) {
        gulp.watch(path.join(config.repos.backend, '**/*.raml'), ['html-raml']);
    }
});

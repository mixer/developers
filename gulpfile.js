'use strict';

const path = require('path');

const config = require('config');
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

require('./build/docs')(gulp, $);
require('./build/misc')(gulp, $);
require('./build/css')(gulp, $);

const defaultTasks = ['html', 'js', 'css', 'images'];

if (config.buildReferenceDocs) {
    defaultTasks.push('java-doc');
}

gulp.task('default', defaultTasks);
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

'use strict';

const path = require('path');

const config = require('config');
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

require('./build/docs')(gulp, $);
require('./build/misc')(gulp, $);
require('./build/css')(gulp, $);

const bePath = process.env.BACKEND_PATH;
config.backendRamlPath = bePath && path.join(bePath, 'doc/raml');
if (bePath) {
    // eslint-disable-next-line global-require
    const pkgInfo = require(path.join(bePath, 'package.json'));
    if (pkgInfo.name !== 'beam-backend') {
        throw new Error('BACKEND_PATH not pointing to backend project');
    }
}

gulp.task('default', ['html', 'js', 'css', 'images', 'java-doc']);
gulp.task('recompile', ['html-quick', 'js', 'css', 'images']);

gulp.task('watch', () => {
    gulp.watch('src/css/**/*.less', ['css']);
    gulp.watch(config.src.html, ['html-quick']);
    gulp.watch(config.src.js, ['js']);
    if (bePath) {
        gulp.watch(path.join(config.backendRamlPath, '**/*.raml'), ['backend-doc']);
    }
});

'use strict';

const config = require('config');
const path = require('path');

/**
 * Registers a task that compiles
 * @param  {Gulp} gulp
 * @param  {Object} $ plugin loader
 * @param  {Object} flags additional build flags
 * @return {Stream}
 */
module.exports = (gulp, $) => {
    /**
     * Task: `iconfont`
     *   - pipe .svg files
     *   - compile them to an iconfont
     *   - generate css
     */
    gulp.task('iconfont', () => {
        const fontName = 'beam';
        return gulp.src(config.src.icons)
        .pipe($.iconfont({
            fontName,
            normalize: true,
            formats: ['ttf', 'eot', 'woff', 'svg'],
        }))
        .on('glyphs', glyphs => {
            gulp.src(path.join(__dirname, '_iconfont.less'))
            .pipe($.consolidate('lodash', {
                glyphs,
                fontName,
                fontPath: '../font/',
                className: 'icon',
            }))
            .pipe(gulp.dest('src/css'));
        })
        .pipe(gulp.dest(config.dist.font));
    });

    /**
     * Task: `css`
     *   - pipe .less files
     *   - compile with less
     *   - autoprefix browser specific prefixes
     *   - minify in production
     *   - output
     */
    gulp.task('css', gulp.series(['iconfont'], () => {
        return gulp.src(config.src.css)
        .pipe($.less())
        .pipe($.autoprefixer())
        .pipe($.if(config.minify, $.cleanCss()))
        .pipe(gulp.dest(config.dist.css));
    }));
};

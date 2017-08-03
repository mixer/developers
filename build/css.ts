import { GulpPlugins } from 'gulp-load-plugins';
import { Gulp } from 'gulp';
import { config } from './config';
import { join } from 'path';

/**
 * Registers a task that compiles
 */
export function task (gulp: Gulp, $: GulpPlugins) {
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
            gulp.src(join(__dirname, '_iconfont.less'))
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
    gulp.task('css', ['iconfont'], () => {
        return gulp.src(config.src.css)
        .pipe($.less())
        .pipe($.autoprefixer())
        .pipe($.if(config.minify, $.cleanCss()))
        .pipe(gulp.dest(config.dist.css));
    });
};

import { join } from 'path';
import { config } from './build/config';
import { task, watch } from 'gulp';
import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import { GulpPlugins } from 'gulp-load-plugins';

import { task as docs } from './build/docs';
import { task as misc } from './build/misc';
import { task as css } from './build/css';

const loader = gulpLoadPlugins<GulpPlugins>();

docs(gulp);
misc(gulp, loader);
css(gulp, loader);

const defaultTasks = ['html', 'js', 'css', 'images'];

if (config.buildReferenceDocs) {
    defaultTasks.push('java-doc');
}

task('default', defaultTasks);
task('recompile', ['html-quick', 'js', 'css', 'images']);

task('watch', () => {
    watch('src/css/**/*.less', ['css']);
    watch(config.src.html, ['html-quick']);
    watch(config.src.snippets, ['html-quick']);
    watch(config.src.js, ['js']);
    if (config.repos && config.repos.backend) {
        watch(join(config.repos.backend, '**/*.raml'), ['html-raml']);
    }
});

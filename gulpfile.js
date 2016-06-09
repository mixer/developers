
const path = require('path');
const child_process = require('child_process');

const gulp = require('gulp');
const Bluebird = require('bluebird');
const del = require('del');
const raml2html = require('raml2html');

const fs = Bluebird.promisifyAll(require('fs'));
const mkdirp = Bluebird.promisify(require('mkdirp'));

const pug = require('gulp-pug');
const less = require('gulp-less');

const LessPluginCleanCSS = require('less-plugin-clean-css');
const LessPluginAutoPrefix = require('less-plugin-autoprefix');

const bsmd = 'node_modules/bootstrap-material-design/dist';

const paths = {
    src: {
        backend: process.env.BE_PATH || '../backend',
        material: {
            scripts: [
                path.join(bsmd, 'js/material.min.js'),
                path.join(bsmd, 'js/ripples.min.js'),
            ],
        },
        icon: 'src/favicon.ico',
        images: 'src/images/**/*',
        pug: 'src/pug/*.pug',
        styles: 'src/styles/**/*.less',
        restDocsNunjucks: './src/nunjucks/raml2html/template.nunjucks',
    },
    dist: {
        rest: 'temp/rest.html',
        styles: 'dist/styles',
        html: 'dist',
        scripts: 'dist/scripts',
        icon: 'dist',
        images: 'dist/images',
    },
    watch: {
        pug: 'src/pug/**/*.pug',
        restDocsNunjucks: './src/nunjucks/raml2html/**/*.nunjucks',
    },
};

const javadocCommand = [
    'rm -rf .tmp/',
    'mkdir -p .tmp',
    'git clone https://github.com/WatchBeam/beam-client-java .tmp/beam-client-java',
    'cd .tmp/beam-client-java',
    'mvn clean javadoc:javadoc',
    'cp -R ./target/site/apidocs/ ../../dist/java-doc',
    'cd ../../',
    'rm -rf .tmp/',
].join(' && ');

gulp.task('java-doc', () => {
    child_process.execSync(javadocCommand);
});

gulp.task('clean', () => del.sync([
    'dist/**/*',
    'tmp/**/*',
]));

gulp.task('rest-doc', () =>
    Bluebird.resolve(
        raml2html.render(
            path.join(paths.src.backend, 'doc/raml/index.raml'),
            raml2html.getDefaultConfig(paths.src.restDocsNunjucks, __dirname)
        )
    )
    .tap(() => mkdirp('temp'))
    .then(html => fs.writeFileAsync(paths.dist.rest, html))
);

gulp.task('copy-scripts', () =>
    gulp.src(paths.src.material.scripts)
    .pipe(gulp.dest(paths.dist.scripts))
);

gulp.task('pug', () =>
    gulp.src(paths.src.pug).pipe(pug({
        locals: {

        },
    }))
    .pipe(gulp.dest(paths.dist.html))
);

gulp.task('icon', () =>
    gulp.src(paths.src.icon)
    .pipe(gulp.dest(paths.dist.icon))
);

gulp.task('images', () =>
    gulp.src(paths.src.images)
    .pipe(gulp.dest(paths.dist.images))
);

gulp.task('styles', () =>
    gulp.src(paths.src.styles)
    .pipe(less({
        paths: [
            'node_modules/bootstrap-material-design/less',
        ],
        plugins: [
            new LessPluginCleanCSS({ advanced: true }),
            new LessPluginAutoPrefix({ browsers: ['last 2 versions'] }),
        ],
    }))
    .pipe(gulp.dest(paths.dist.styles))
);

gulp.task('watch', () => {
    gulp.watch(paths.src.styles, ['styles']);
    gulp.watch(paths.watch.pug, ['pug']);
    gulp.watch(paths.watch.restDocsNunjucks, ['rest-doc', 'pug']);
});

gulp.task('dist', ['clean', 'copy-scripts', 'styles', 'icon', 'images', 'pug']);

/* eslint-disable no-console */

'use strict';

const assert = require('assert');

const hostLocation = process.env.HOST_LOCATION;
assert(hostLocation, 'HOST_LOCATION env variable must be set.');

const path = require('path');
const childProcess = require('child_process');

const gulp = require('gulp');
const Bluebird = require('bluebird');
const del = require('del');
const raml2html = require('raml2html');
const _ = require('lodash');

const fs = Bluebird.promisifyAll(require('fs'));
const mkdirp = Bluebird.promisify(require('mkdirp'));

const pug = require('gulp-pug');
const less = require('gulp-less');
const runSequence = require('run-sequence');

const LessPluginCleanCSS = require('less-plugin-clean-css');
const LessPluginAutoPrefix = require('less-plugin-autoprefix');

const bsmd = 'node_modules/bootstrap-material-design/dist';

const ramlPath = process.env.BE_PATH || '../backend/doc/raml';

const paths = {
    src: {
        rest: ramlPath,
        material: {
            scripts: [
                path.join(bsmd, 'js/material.min.js'),
                path.join(bsmd, 'js/ripples.min.js'),
            ],
        },
        icon: 'src/favicon.ico',
        images: 'src/images/**/*',
        pug: ['src/pug/**/*.pug', '!src/pug/layouts/*', '!src/pug/includes'],
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
        pug: 'src/pug/**/*',
        restDoc: path.join(ramlPath, '**/*.raml'),
        restDocsNunjucks: './src/nunjucks/raml2html/**/*.nunjucks',
    },
};

function handleError (stream) {
    return stream.on('error', function (error) {
        console.error(error.stack);
        // Keep gulp from hanging on this task
        if (this.emit) this.emit('end');
        if (this.end) this.end();
    });
}

const javadocCommand = [
    'rm -rf temp/',
    'mkdir -p temp',
    'git clone https://github.com/WatchBeam/beam-client-java temp/beam-client-java',
    'cd temp/beam-client-java',
    'mvn clean javadoc:javadoc',
    'cp -R ./target/site/apidocs/ ../../dist/java-doc',
    'cd ../../',
].join(' && ');

gulp.task('java-doc', () => {
    childProcess.execSync(javadocCommand);
});

gulp.task('clean', () => del.sync([
    'dist/**/*',
    'tmp/**/*',
]));

/**
 * Retrieves all methods from a raml resource object
 * @param  {Object[]} resources
 * @return {Object[]}
 */
function flattenMethods (resources) {
    let ret = [];
    resources.forEach(resource => {
        if (resource.methods) {
            ret = ret.concat(resource.methods);
        }
        if (resource.resources) {
            ret = ret.concat(flattenMethods(resource.resources));
        }
    });
    return ret;
}

/**
 * Generates a custom raml2html config object, injecting some of our own logic
 * to add features raml2html doesn't provide by default.
 * @return {Object}
 */
function generateRAML2HTMLConfig () {
    const defaultConfig = raml2html.getDefaultConfig(paths.src.restDocsNunjucks, __dirname);
    const oldRef = defaultConfig.processRamlObj;
    //
    defaultConfig.processRamlObj = ramlObject => {
        const methods = flattenMethods(ramlObject.resources).filter(m => m.is);
        // Alter description to reflect permission requirements.
        methods.forEach(method => {
            const trait = _.find(method.is, t => t.permissible);
            if (!trait) {
                return;
            }
            method.description +=
            `\n\n This endpoint requires the \`${trait.permissible.permission}\` permission`;
        });

        return oldRef(ramlObject);
    };
    return defaultConfig;
}

gulp.task('rest-doc', () =>
    Bluebird.resolve(
        raml2html.render(
            path.join(paths.src.rest, 'index.raml'),
            generateRAML2HTMLConfig()
        )
    )
    .tap(() => mkdirp('temp'))
    .then(html => fs.writeFileAsync(paths.dist.rest, html))
);

gulp.task('copy-scripts', () =>
    gulp.src(paths.src.material.scripts)
    .pipe(gulp.dest(paths.dist.scripts))
);

/**
 * Creates a new object with all values from the passed object ordered by keys
 * @param  {Object} obj
 * @return {Object}
 */
function orderObject (obj) {
    const ret = {};
    const orderedKeys = Object.keys(obj).sort();
    for (const key of orderedKeys) {
        ret[key] = obj[key];
    }
    return ret;
}

/**
 * Generates locals required for templating.
 * @return {Object}
 */
function getLocals () {
    let permissions;
    try {
        // eslint-disable-next-line global-require
        permissions = orderObject(require('@mcph/beam-common').permissions);
    } catch (error) {
        console.warn('Beam common not available, using dummy permission list');
        permissions = {
            'some:test': {
                text: 'Text description',
            },
        };
    }
    const chatEvents = _.cloneDeep(require('./data/chat/events.json'));
    _.forEach(chatEvents, event => {
        event.example = JSON.stringify(event.example, null, '  ');
    });
    return {
        permissions,
        hostLocation,
        fixtures: {
            chat: {
                events: chatEvents,
            },
        },
    };
}

gulp.task('pug', () =>
    gulp.src(paths.src.pug)
    .pipe(
        handleError(
            pug({
                locals: getLocals(),
            })
        )
    )
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
        globalVars: {
            hostLocation,
        },
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

gulp.task('rest-doc-pug', cb => {
    runSequence('rest-doc', 'pug', cb);
});

gulp.task('watch', () => {
    gulp.watch(paths.src.styles, ['styles']);
    gulp.watch(paths.watch.pug, ['pug']);
    gulp.watch([
        paths.watch.restDoc,
        paths.watch.restDocsNunjucks,
    ], ['rest-doc-pug']);
});

gulp.task('dist-light', cb => {
    runSequence(
        'clean',
        ['copy-scripts', 'styles', 'icon', 'images'],
        'pug'
    , cb);
});

gulp.task('dist', cb => {
    runSequence(
        'clean',
        ['copy-scripts', 'styles', 'icon', 'images', 'java-doc', 'rest-doc'],
        'pug'
    , cb);
});

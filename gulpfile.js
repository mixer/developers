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

const chatActions = require('./data/chat/actions.json');
const chatEvents = require('./data/chat/events.json');

/**
 * Contains all source dist and watch paths.
 * Now paths should be hardcoded below this object.
 * @type {Object}
 */
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

const isWatch = process.argv.some(task => task === 'watch');

/**
 * Simple error handler function that stops gulp watch from crashing.
 * Will do nothing when the task is not watch.
 * @param  {Stream} stream
 * @return {Stream} stream
 */
function handleError (stream) {
    if (!isWatch) {
        return stream;
    }
    return stream.on('error', function (error) {
        console.error(error.stack);
        // Keep gulp from hanging on this task
        if (this.emit) this.emit('end');
        if (this.end) this.end();
    });
}

/**
 * The command to be executed in order to build the java-doc.
 * @type {String}
 */
const javadocCommand = [
    'rm -rf temp/',
    'mkdir -p temp',
    'git clone https://github.com/WatchBeam/beam-client-java temp/beam-client-java',
    'cd temp/beam-client-java',
    'mvn clean javadoc:javadoc',
    'cp -R ./target/site/apidocs/ ../../dist/java-doc',
    'cd ../../',
].join(' && ');

/**
 * Clones the beam-client-java and generates the corresponding JavaDoc.
 */
gulp.task('java-doc', () => {
    childProcess.execSync(javadocCommand);
});

/**
 * Wipes the dist and temp folder for a fresh build.
 */
gulp.task('clean', () => del.sync([
    'dist/**/*',
    'temp/**/*',
]));

/**
 * @callback RAMLTraverseCallback
 * @param {Resource|Method} resource The current resource or method
 * @param {Boolean} isMethod Indicates if node is a method.
 * keep in mind that methods are 'leaves' and have no children.
 * @return {Boolean} If falsy, the entire resource and subresources will be
 * discarded.
 */

/**
 * Traverses the entire resource tree while providing a way to filter out specific
 * notes from the tree.
 * @param  {Object[]} resources
 * @param  {RAMLTraverseCallback} callback
 */
function traverseRAMLResourceTree (resources, callback) {
    resources.forEach((resource, idx) => {
        if (!callback(resource, false)) {
            resources.splice(idx, 1);
            return;
        }
        if (resource.methods) {
            resource.methods.forEach((method, methodIdx) => {
                if (!callback(method, true)) {
                    resource.methods.splice(methodIdx, 1);
                    return;
                }
            });
        }
        if (resource.resources) {
            traverseRAMLResourceTree(resource.resources, callback);
        }
    });
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
        traverseRAMLResourceTree(ramlObject.resources, (resource, isMethod) => {
            if (resource.annotations && resource.annotations.internal) {
                return false;
            }

            if (isMethod) {
                // Alter description to reflect permission requirements.
                const trait = _.find(resource.is, t => t.permissible);
                if (!trait) {
                    return true;
                }
                resource.description +=
                `\n\n This endpoint requires the \`${trait.permissible.permission}\` permission`;
            }
            return true;
        });
        return oldRef(ramlObject);
    };
    return defaultConfig;
}

/**
 * This task relies on the presence of a backend install.
 * It uses raml2html to render the raml docs with our own nunjuck templates
 * and a bit of our own logic such as:
 * Injection of required permissions warnings into descriptions.
 * TODO: Filtering of methods that should not be exported.
 * TODO: ReadOnly/Private property indicators.
 * It then moves the compiled html into the temp folder,
 * from there it is included by pug.
 */
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

/**
 * Copies 3rd party javascript for dist.
 */
gulp.task('copy-scripts', () =>
    gulp.src(paths.src.material.scripts)
    .pipe(gulp.dest(paths.dist.scripts))
);

/**
 * Creates a new object with all values from the passed object ordered by keys.
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
 * Pretty prints objects as string
 * @param  {Object} object
 * @return {String}
 */
function prettyJSON (object) {
    return JSON.stringify(object, null, '  ');
}

/**
 * Generates locals required for templating.
 * `permissions` is used for the REST API docs, they are displayed in a table.
 * `hostLocation` is needed for correct resource loading of paths (src, href, etc.)
 * `fixtures` contains misc json structures.
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
    const actions = _.cloneDeep(chatActions);
    _.forEach(actions, action => {
        action.example.request = prettyJSON(action.example.request);
        if (action.example.response) {
            action.example.response = prettyJSON(action.example.response);
        }
    });
    const events = _.cloneDeep(chatEvents);
    _.forEach(events, event => {
        event.example = prettyJSON(event.example);
    });
    return {
        permissions,
        hostLocation,
        fixtures: {
            chat: {
                events,
                actions,
            },
        },
    };
}

/**
 * Compiles pug templates.
 */
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

/**
 * Moves the favicon.
 */
gulp.task('icon', () =>
    gulp.src(paths.src.icon)
    .pipe(gulp.dest(paths.dist.icon))
);

/**
 * Copies images.
 * TODO: Imagemin.
 */
gulp.task('images', () =>
    gulp.src(paths.src.images)
    .pipe(gulp.dest(paths.dist.images))
);

/**
 * Compiles and dists less to css.
 */
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

/**
 * Rebuilds the rest docs and runs pugs, useful when editing the raml docs.
 */
gulp.task('rest-doc-pug', cb => {
    runSequence('rest-doc', 'pug', cb);
});

/**
 * Watches the following:
 * pug changes
 * style changes
 * raml doc changes (in backend)
 */
gulp.task('watch', () => {
    gulp.watch(paths.src.styles, ['styles']);
    gulp.watch(paths.watch.pug, ['pug']);
    gulp.watch([
        paths.watch.restDoc,
        paths.watch.restDocsNunjucks,
    ], ['rest-doc-pug']);
});

/**
 * Fast version of dist, does not build JavaDoc and Raml Docs.
 */
gulp.task('dist-light', cb => {
    runSequence(
        'clean',
        ['copy-scripts', 'styles', 'icon', 'images'],
        'pug'
    , cb);
});

/**
 * Full version of dist, should be used for deployment.
 */
gulp.task('dist', cb => {
    runSequence(
        'clean',
        ['copy-scripts', 'styles', 'icon', 'images', 'java-doc', 'rest-doc'],
        'pug'
    , cb);
});

'use strict';

const childProcess = require('child_process');
const config = require('config');
const path = require('path');
const fs = require('fs');

// Function which returns raml2html. We don't load this on require-time since
// it has a _lot_ of dependencies and slows down development builds when
// unneeded.
const raml2html = () => require('raml2html');


/**
 * Ensures that the repo cloneable at the provided address is downloaded
 * and up-to-date.
 * @param  {String} addr
 * @param  {Function} callback
 */
function getRepo(addr, callback) {
    // extract everything after the last slash of the path, excluding .git:
    const name = (/\/([^/]*?)(\.git)?$/).exec(addr)[1];
    const target = path.join(config.src.tmp, name);
    fs.lstat(target, function(err, stats) {
        if (!err && stats.isDirectory()) {
            childProcess.exec(`cd ${target} && git pull`, callback);
        } else {
            childProcess.exec(`cd ${config.src.tmp} && git clone ${addr}`, callback);
        }
    });
}

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
    const defaultConfig = raml2html().getDefaultConfig(config.src.restTmpl, __dirname + '/..');
    const oldRef = defaultConfig.processRamlObj;

    defaultConfig.processRamlObj = ramlObject => {
        traverseRAMLResourceTree(ramlObject.resources, (resource, isMethod) => {
            if (resource.annotations && resource.annotations.internal) {
                return false;
            }

            if (isMethod) {
                // Alter description to reflect permission requirements.
                const trait = resource.is && resource.is.find(t => t.permissible);
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
 * Registers a task that compiles
 * @param  {Gulp} gulp
 * @param  {Object} $ plugin loader
 * @return {Stream}
 */
module.exports = (gulp, $) => {
    gulp.task('java-clone', (callback) => {
        getRepo('git@github.com:WatchBeam/beam-client-java.git', callback);
    });
    gulp.task('java-mvn-gen', ['java-clone'], (callback) => {
        childProcess.exec(`cd ${config.src.tmp}/beam-client-java && mvn clean javadoc:javadoc`, callback);
    });
    gulp.task('java-doc', ['java-mvn-gen'], () => {
        return gulp.src(path.join(config.src.tmp, 'beam-client-java/target/site/apidocs'))
        .pipe(gulp.dest(config.dist.javadoc));
    });

    gulp.task('backend-clone', (callback) => {
        getRepo('git@github.com:WatchBeam/backend.git', callback);
    });
    gulp.task('backend-doc', ['backend-clone'], () => {
        return raml2html().render(
            path.join(config.src.tmp, 'backend/doc/raml/index.raml'),
            generateRAML2HTMLConfig()
        )
        .then(html => fs.writeFileSync(path.join(config.src.tmp, 'raml-doc.html'), html));
    });
};

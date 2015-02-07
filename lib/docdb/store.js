var Doc = require('./doc');
var Tree = require('./tree');
var glob = require('glob');
var _ = require('lodash');

var ext = '.jade';

/**
 * Responsible as kind of a database for doc files. Synchronous, should
 * be loaded once on boot and never more.
 *
 * @param {String} dir
 */
function Store (dir) {
    this.dir = dir;
    this.load();
}

/**
 * Maps doc files in the directory to an object with keys of
 * relative filenames, and values of corresponding Doc objects.
 */
Store.prototype.load = function () {
    var files = this.files = new Tree();
    var dir = this.dir;

    glob.sync('**/[!_]*' + ext, { cwd: dir }).forEach(function (file) {
        var doc = new Doc(dir + '/' + file);
        doc.dbpath = file.slice(0, -ext.length);
        files.add(doc.dbpath, doc);
    });

    this.groupedResources = _.groupBy(files.flatten(), 'resource');
};

/**
 * Returns whether the document store has the file in its registry.
 * @param {String} file
 * @return {Boolean}
 */
Store.prototype.has = function (file) {
    return this.files.has(file);
};

/**
 * Gets the tree at the position. You can access its value or examine
 * the subtrees.
 * @param {String} file
 * @return {Tree}
 */
Store.prototype.get = function (file) {
    return this.files.get(file);
};

/**
 * Retrieves docs grouped by their "resource"
 * @return {Object}
 */
Store.prototype.grouped = function () {
    return this.groupedResources;
};

module.exports = Store;

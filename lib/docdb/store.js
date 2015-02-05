var Doc = require('./doc');
var Tree = require('./tree');
var glob = require('glob');

var ext = '.md';

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
 * Maps markdown files in the directory to an object with keys of
 * relative filenames, and values of corresponding Doc objects.
 */
Store.prototype.load = function () {
    var files = this.files = new Tree();
    var dir = this.dir;

    glob.sync('**/*' + ext, { cwd: dir }).forEach(function (file) {
        files.add(file.slice(0, -ext.length), new Doc(dir + '/' + file));
    });
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

module.exports = Store;

var delimiter = '/';

/**
 * Takes a map of files (relative paths => doc objects) and builds
 * a tree out of them. Good for fast and efficient lookups.
 *
 * Note: in this implementation we assume that all nodes that have
 * values are leaf nodes, and all internal nodes have no values.
 *
 * @param {Object} files
 */
function Tree (value) {
    this.value = value;
    this.subtrees = {};
}

/**
 * Returns whether the tree has any subtrees.
 * @return {Boolean}
 */
Tree.prototype.isEmpty = function () {
    return Object.keys(this.subtrees).length === 0;
};

/**
 * Adds a new file to the document tree. Name can be split by slashes
 * or be passed in as a string.
 *
 * @param {[]String|String} name
 * @param {Doc} doc
 * @return {Tree}
 */
Tree.prototype.add = function (name, doc) {
    var path = Array.isArray(name) ? name : name.split(delimiter);
    if (path.length === 0) {
        this.value = doc;
        return this;
    }

    var target = this.subtrees[path[0]];
    if (typeof target === 'undefined') {
        this.subtrees[path[0]] = target = new Tree();
    }

    return target.add(path.slice(1), doc);
};

/**
 * Checks to see if the Tree contains the given string/path. This
 * will only return true if the name resolves to a leaf node on the tree.
 * That is, an actual file.
 *
 * @param {[]String|String} name
 * @return {Boolean}
 */
Tree.prototype.has = function (name) {
    var path = Array.isArray(name) ? name : name.split(delimiter);
    if (path.length === 0) {
        return this.isEmpty();
    }

    var subtree = this.subtrees[path[0]];
    if (typeof subtree === 'undefined') {
        return false;
    } else {
        return subtree.has(path.slice(1));
    }
};

/**
 * Gets a value from its path.
 * @param {[]String|String} name
 * @return {Tree}
 */
Tree.prototype.get = function (name) {
    var path = Array.isArray(name) ? name : name.split(delimiter);
    if (path.length === 0) {
        return this;
    }

    return this.subtrees[path[0]].get(path.slice(1));
};

/**
 * Converts the tree into a flat object.
 * @return {Object}
 */
Tree.prototype.toObject = function () {
    var output = {};
    for (var subKey in this.subtrees) {
        if (this.subtrees[subKey].isEmpty()) {
            output[subKey] = this.subtrees[subKey].value;
        } else {
            var nested = this.subtrees[subKey].toObject();
            for (var nestedKey in nested) {
                output[subKey + delimiter + nestedKey] = nested[nestedKey];
            }
        }
    }

    return output;
};

/**
 * Returns a flat list of all documents in the tree.
 * @return {Array}
 */
Tree.prototype.flatten = function () {
    if (this.value) {
        return [this.value];
    }

    var output = [];
    for (var key in this.subtrees) {
        output = output.concat(this.subtrees[key].flatten());
    }

    return output;
};

module.exports = Tree;

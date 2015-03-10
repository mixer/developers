var fs = require('fs');
var jade = require('jade');
var path = require('path');

function Doc (file) {
    this.file = file;
    this.basename = path.basename(file, '.jade');
    this.load();
}

/**
 * Imports data from the file, rendering markdown and adding properties
 * to the doc object. Markdown files are allowed to define certain
 * variables at the beginning in the format `=name value`. One variable
 * per line.
 */
Doc.prototype.load = function () {
    var contents = fs.readFileSync(this.file)
        .toString('utf8')
        .split('\n');

    while (contents[0].charAt(0) === '=') {
        var kv = contents.shift().slice(1);
        var split = kv.indexOf(' ');

        this[kv.slice(0, split).trim()] = kv.slice(split).trim();
    }

    this.content = jade.render(contents.join('\n'), { filename: this.file });
};

module.exports = Doc;

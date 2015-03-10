var docdb = require('../../docdb');

module.exports.index = function (req, res) {
    res.render('index.jade', {
        title: 'Beam Developers',
        changelogs: docdb.sortedChangelog.slice(0, 3)
    });
};

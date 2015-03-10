var docdb = require('../../docdb');

module.exports.view = function (req, res) {
    var path = 'changelog/' + req.params.log;
    if (!docdb.has(path)) {
        return res.status(404).send('Not found.');
    }

    res.render('changelogs/article.jade', {
        title: 'Changelogs- Beam Developers',
        changelog: docdb.get(path).value
    });
};

module.exports.index = function (req, res) {
    res.render('changelogs/index.jade', {
        title: 'Changelogs - Beam Developers',
        changelogs: docdb.sortedChangelog
    });
};

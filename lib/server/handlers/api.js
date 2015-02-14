var docdb = require('../../docdb');

module.exports.index = function (req, res) {
    res.render('api/index.jade', {
        title: 'API Reference - Beam Developers',
        resources: docdb.grouped()
    });
};

module.exports.auth = function (req, res) {
    res.render('api/auth.jade', {
        title: 'Authorization - Beam Developers'
    });
};

module.exports.doc = function (req, res) {
    var path = 'api/' + req.params[0];
    if (!docdb.has(path)) {
        return res.status(404).send('Not found.');
    }

    res.render('api/article.jade', {
        title: 'API Reference - Beam Developers',
        article: docdb.get(path).value,
        resources: docdb.grouped()
    });
};

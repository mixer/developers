var docdb = require('../../docdb');

module.exports.index = function (req, res) {
    res.render('api.jade', {
        title: 'API Reference - Beam Developers',
        endpoints: docdb.get('api').toObject()
    });
};

module.exports.doc = function (req, res) {
    var path = 'api/' + req.params[0];
    if (!docdb.has(path)) {
        return res.status(404).send('Not found.');
    }

    res.render('article.jade', {
        title: 'API Reference - Beam Developers',
        article: docdb.get(path).value,
        resources: docdb.grouped()
    });
};

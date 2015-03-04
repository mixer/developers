var docdb = require('../../docdb');

module.exports.index = function (req, res) {
    res.render('api/index.jade', {
        title: 'API Reference - Beam Developers'
    });
};

module.exports.endpoints = function (req, res) {
    res.render('api/endpoints.jade', {
        title: 'Endpoints - Beam Developers',
        resources: docdb.groupedApi
    });
};

module.exports.oauth = function (req, res) {
    res.render('api/oauth.jade', {
        title: 'Authorization - Beam Developers'
    });
};

module.exports.chatproto = function (req, res) {
    res.render('api/chatproto.jade', {
        title: 'Chat Protocol - Beam Developers'
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
        resources: docdb.groupedApi
    });
};

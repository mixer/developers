var docdb = require('../../docdb');

module.exports.index = function (req, res) {
    res.render('api.jade', {
        title: 'API Reference - Beam Developers',
        endpoints: docdb.get('api').toObject()
    });
};

var express = require('express');
var app = express();

app.use(express.static(__dirname + '/../../static'));
app.set('views', __dirname + '/../../src/template');
app.set('view engine', 'jade');

app.get('/', require('./handlers/index').index);

app.get('/api', require('./handlers/api').index);
app.get('/api/*', require('./handlers/api').doc);

module.exports = app;

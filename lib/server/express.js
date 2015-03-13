var express = require('express');
var app = express();

app.use(express.static(__dirname + '/../../static'));
app.set('views', __dirname + '/../../src/template');
app.set('view engine', 'jade');

app.get('/', require('./handlers/index').index);

app.get('/changelogs', require('./handlers/changelog').index);
app.get('/changelogs/:log', require('./handlers/changelog').view);

app.get('/api', require('./handlers/api').index);
app.get('/api/oauth', require('./handlers/api').oauth);
app.get('/api/chatproto', require('./handlers/api').chatproto);
app.get('/api/endpoints', require('./handlers/api').endpoints);
app.get('/api/widget', require('./handlers/api').widget);
app.get('/api/*', require('./handlers/api').doc);

module.exports = app;

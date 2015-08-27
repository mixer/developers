var Server = require("./server");
var config = require("config");
var port = config.get('server.port');

var server = new Server(port, "./docs");

server.start();

var Server = require("./server");
var port = process.env.PORT || 9393;

var server = new Server(port, "./docs");

server.start();

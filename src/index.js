var Server = require("./server");
var server = new Server(9292, "./docs");

server.start();

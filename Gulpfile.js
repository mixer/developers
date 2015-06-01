var gulp = require('gulp');
var fs = require('fs');
var path = require("path");

var tasks = fs.readdirSync('./tasks');
for (var i in tasks) {
  var task = tasks[i];
  require(path.join(__dirname, "tasks", task));
}

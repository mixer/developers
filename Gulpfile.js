var gulp = require('gulp');
var fs = require('fs');

var tasks = fs.readdirSync('./tasks');
for (var i in tasks) {
  var task = tasks[i];
  require(task);
}

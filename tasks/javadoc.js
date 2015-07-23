var gulp = require("gulp");
var exec = require("child_process").exec;

gulp.task("javadoc", function (done) {
  exec("./script/javadoc.sh", function (err, stdout, stderr) {
    if (err) console.log(err);
    if (stderr) console.log(stderr);

    return done(err || stderr);
  });
});

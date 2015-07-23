var gulp = require("gulp");

gulp.task("javadoc", function (done) {
  exec("./script/javadoc.sh", function (err, stdout, stderr) {
    if (err) console.log(err);
    if (stderr) console.log(stderr);

    return done(err || stderr);
  });
});

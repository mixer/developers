var gulp = require("gulp");
var babel = require("gulp-babel");

gulp.task("build", [ "build-backend" ]);

gulp.task("build-backend", function () {
  gulp.src("./src/**/*.js*")
      .pipe(babel())
      .pipe(gulp.dest("./__build__/"));
});

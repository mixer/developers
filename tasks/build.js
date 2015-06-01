var gulp = require("gulp");
var babel = require("gulp-babel");
var sass = require("gulp-sass");

gulp.task("build", [ "build-backend", "build-frontend" ]);

gulp.task("build-backend", function () {
  gulp.src("./src/**/*.js*")
      .pipe(babel())
      .pipe(gulp.dest("./__build__/"));
});

gulp.task("build-frontend", function () {
  gulp.src("./app/stylesheets/**/*.scss")
      .pipe(sass())
      .pipe(gulp.dest("./__build__/assets/css"));
});

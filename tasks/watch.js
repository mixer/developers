var gulp = require("gulp");
var babel = require("gulp-babel");
var sass = require("gulp-sass");

gulp.task("watch", [ "watch-backend", "watch-frontend" ]);

gulp.task("watch-backend", function () {
  gulp.watch("./src/**/*.js*", [ "build-backend" ]);
});

gulp.task("watch-frontend", function () {
  gulp.watch("./app/stylesheets/**/*.scss", [ "build-frontend" ]);
});

const gulp = require('gulp');

const babel = require('gulp-babel');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('build', ['build-backend', 'build-frontend']);

gulp.task('build-backend', () => {
    gulp.src('./src/_html/**/*').pipe(gulp.dest('./__build__/_html/'));
    return gulp.src('./src/**/*.js*')
    .pipe(babel())
    .pipe(gulp.dest('./__build__/'));
});

gulp.task('build-frontend', () =>
    gulp.src('./app/stylesheets/**/*.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest('./__build__/assets/css'))
);

gulp.task('watch', ['watch-backend', 'watch-frontend']);

gulp.task('watch-backend', () => {
    gulp.watch('./src/**/*.js*', ['build-backend']);
});

gulp.task('watch-frontend', () => {
    gulp.watch('./app/stylesheets/**/*.scss', ['build-frontend']);
});

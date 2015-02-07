var gulp         = require('gulp'),
    isProduction = false,
    $            = require('gulp-load-plugins')();

var globs = {
    css: 'src/static/css/**/*.less',
    js: 'src/static/js/**/*.js',
    images: 'src/static/img/**/*.{gif,jpg,jpeg,png,svg}',
    misc: 'src/static/**/*.{ico,eot,woff,ttf,php}'
};

gulp.task('css', function() {
    gulp.src('src/static/css/style.less')
        .pipe($.less())
        .pipe($.autoprefixer())
        .pipe($.if(isProduction, $.minifyCss()))
        .pipe(gulp.dest('static/css'));
});
gulp.task('js', function () {
    gulp.src('src/static/js/developers.js')
        .pipe($.browserify({
            insertGlobals : true,
            debug : !isProduction,
            nobuiltins: 'querystring'
        }))
        .pipe($.if(isProduction, $.uglify()))
        .pipe(gulp.dest('static/js'));

    gulp.src([
        'src/static/js/prism.js',
    ]).pipe(gulp.dest('static/js'));
});
gulp.task('images', function() {
    gulp.src(globs.images)
        .pipe($.if(isProduction, $.imagemin({
            progressive: true
        })))
        .pipe(gulp.dest('static/img'));
});
gulp.task('misc', function () {
    gulp.src(globs.misc).pipe(gulp.dest('static'));
});

gulp.task('setProduction', function() {
    isProduction = true;
});

gulp.task('dist', ['setProduction', 'default']);
gulp.task('default', ['js', 'css', 'images', 'misc']);

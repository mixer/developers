var gulp         = require('gulp'),
    isProduction = false,
    $            = require('gulp-load-plugins')();

var globs = {
    css: 'src/static/css/**/*.less',
    js: 'src/static/js/**/*.js',
    images: [
        'src/static/img/**/*.{gif,jpg,jpeg,png,svg}',
        'bower_components/master/icons/php/php-*.svg',
        'bower_components/master/icons/python/python-*.svg',
        'bower_components/master/icons/java/java-*.svg',
        'bower_components/master/icons/nodejs/nodejs-*.svg',
        'bower_components/master/icons/ruby/ruby-*.svg'
    ]
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
gulp.task('javadocs', $.shell.task([
    'cd ./src/beam-client-java && git pull origin master',
    'cd ./src/beam-client-java && mvn clean site'
]));
gulp.task('misc', function () {
    gulp.src('src/static/**/*.{ico,eot,woff,ttf,php}').pipe(gulp.dest('static'));
    gulp.src('src/static/doc/**/*.*').pipe(gulp.dest('static/doc'));
    gulp.src('src/beam-client-java/target/site/**/*.*').pipe(gulp.dest('static/doc/java-client'));
});

gulp.task('setProduction', function() {
    isProduction = true;
});

gulp.task('dist', ['setProduction', 'default']);
gulp.task('default', ['js', 'css', 'images', 'javadocs', 'misc']);

var gulp = require('gulp');
var pug = require('gulp-pug');
var less = require('gulp-less');
var minifyCSS = require('gulp-csso');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var merge = require('event-stream');
var inject = require('gulp-inject');
var uglify = require('gulp-uglify');
var connect = require( 'gulp-connect' );

var files = [ 'index.html', 'app.min.js', 'app.min.css' ];

gulp.task( 'files', function() {
    gulp.src( files ).pipe( connect.reload() );
});

gulp.task( 'watch', function() {
    gulp.watch( files, [ 'files' ]);
});

gulp.task( 'connect', function() {
    connect.server({ livereload: true });
});

gulp.task('html', function () {
    var index = gulp.src('*.html')
        .pipe(pug())
        .pipe(gulp.dest('../build/'));
    var componente = gulp.src(['src/componente/*.html' , 'src/componente/view/*.html'])
        .pipe(pug())
        .pipe(gulp.dest('../build/src/componente'));
    return merge.concat(index, componente);
});

gulp.task('css', function(){
    return gulp.src('src/public/css/*.css')
    .pipe(less())
    .pipe(concat('app.min.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('src/public/css'));
});

gulp.task('scripts', function(){
 return gulp.src([
        'src/public/js/jquery.js',
        'src/public/js/angular.js',
        'src/public/js/angular-route.js',
        'src/core/app.js',
        'src/componente/router/*.js',
        'src/componente/controller/*.js',
    ])
    .pipe(concat('app.min.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('src/public/js'));
});

gulp.task('copy', function () {
    var css = gulp.src('src/public/css/app.min.css')
    .pipe(gulp.dest('../build/src/public/css'));
    var js = gulp.src('src/public/js/app-min.js')
    .pipe(gulp.dest('../build/src/public/js'));
    var img = gulp.src('src/public/img/**')
    .pipe(gulp.dest('../build/src/public/img'));
    return merge.concat(css, js , img);
});


gulp.task('default', [ 'html', 'css', 'copy' , 'scripts', 'connect', 'watch']);
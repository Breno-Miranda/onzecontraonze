var gulp = require('gulp');
var pug = require('gulp-pug');
var less = require('gulp-less');
var minifyCSS = require('gulp-csso');
var concat = require('gulp-concat');
var merge = require('event-stream');


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
    .pipe(gulp.dest('src/public/js'));
});


gulp.task('default', [ 'html', 'css', 'scripts']);
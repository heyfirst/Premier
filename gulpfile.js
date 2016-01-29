var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var coffee = require('gulp-coffee');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var csslint = require('gulp-csslint');

gulp.task('scss', function () {
  return sass('source/scss/*.scss')
    .on('error', sass.logError)
    .pipe(gulp.dest('assets/css/'));
});

gulp.task('coffee', function() {
  gulp.src('source/coffee/*.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('assets/js/'));
});

gulp.task('lint', function() {
  return gulp.src('assets/js/')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('css', function() {
  gulp.src('assets/css/*.css')
    .pipe(csslint())
    .pipe(csslint.reporter());
});

// Defuault Task

gulp.task('default', ['scss','coffee','lint','css'], function() {
    gulp.watch("source/scss/*.scss", ['scss']);
    gulp.watch("source/coffee/*.coffee", ['coffee']);
    gulp.watch("assets/js/*.js", ['lint']);
    gulp.watch("assets/css/*.css", ['css']);
});

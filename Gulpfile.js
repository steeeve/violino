var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var browserify = require('gulp-browserify');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var haml = require('gulp-ruby-haml');
var mocha = require('gulp-mocha');
var webserver = require('gulp-webserver');

var paths = {};

paths.js = ['src/js/**/*.js', 'src/js/**/*.hbs'];
paths.templates = 'src/**/*.html';
paths.lib = 'src/lib/**/*';
paths.sass = 'src/sass/app.sass';
paths.haml = 'src/index.haml';

gulp.task('sass', function() {
  return sass(paths.sass)
    .on('error', function (err) { console.error('Error!', err.message); })
    .pipe(gulp.dest('dist/css'));
});

gulp.task('haml', function() {
  return gulp.src(paths.haml)
    .pipe(haml())
    .pipe(rename('index.html'))
    .pipe(gulp.dest('dist'));
});

gulp.task('js', function() {
  return gulp.src('src/js/app.js')
    .pipe(jshint())
    .pipe(browserify({
      insertGlobals: true,
      debug: !gulp.env.production,
      transform: ['hbsfy']
    }))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', function() {
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.haml, ['haml']);
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('serve', function() {
  return gulp.src('dist')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: true
    }));
});

gulp.task('test', function() {
  return gulp.src('test/**/*_test.js')
    .pipe(mocha({reporter: 'spec'}));
});

gulp.task('build', ['haml', 'sass', 'js']);

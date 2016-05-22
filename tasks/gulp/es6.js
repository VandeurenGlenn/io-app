'use strict';

// Include promise polyfill for node 0.10 compatibility
require('es6-promise').polyfill();

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

// Transpile all JS to ES6.
gulp.task('ES6', () => {
  var CSP_ALL = GLOBAL.config.CSP_ALL;
  return gulp.src(['src/**/*.{js,html}', '!src/bower_components/**/*'])
  .pipe($.if(GLOBAL.config.env === 'dev', $.sourcemaps.init()))
  .pipe($.if('*.html' && CSP_ALL, $.crisper({scriptInHead: false}))) // Extract JS from .html files
  .pipe($.if('*.js', $.babel({
    presets: ['es2015']
  })))
  .pipe($.if(GLOBAL.config.env === 'dev', $.sourcemaps.write('.')))
  .pipe(gulp.dest(GLOBAL.config.dest))
  .pipe($.size({title: 'ES6'}));
});

gulp.task('ES6:todo', () => {
  return gulp.src(['todo/**/**.{js,html}'])
  .pipe($.sourcemaps.init())
  .pipe($.if('*.html', $.crisper({scriptInHead: false}))) // Extract JS from .html files
  .pipe($.if('*.js', $.babel({
    presets: ['es2015']
  })))
  .pipe($.sourcemaps.write('.'))
  .pipe(gulp.dest('.tmp/todo'));
});

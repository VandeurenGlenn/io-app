'use strict';
var gulp = require('gulp');
var size = require('gulp-size');

var scriptsTask = function(src, dest) {
  return gulp.src(src)
  .pipe(size({title: 'scripts'}))
  .pipe(gulp.dest(dest));
};

gulp.task('scripts', function() {
  return scriptsTask('scripts/*', `${GLOBAL.config.dest}/scripts`);
});

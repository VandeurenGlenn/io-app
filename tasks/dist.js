'use strict';
var gulp = require('gulp');
var path = require('path');

var DIST = 'dist';

var dist = function(subpath) {
  return !subpath ? DIST : path.join(DIST, subpath);
};

gulp.task('dist', () => {
  return dist();
});

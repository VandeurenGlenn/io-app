'use strict';
// Require Gulp & tools we'll use
var gulp = require('gulp');
var styleTask = require('../styles');

gulp.task('elements:styles', () => {
  return styleTask();
});

gulp.task('elements', gulp.series('elements:styles', 'copy:bower_components'));

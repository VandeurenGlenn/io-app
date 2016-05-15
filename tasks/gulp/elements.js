'use strict';
// Require Gulp & tools we'll use
var gulp = require('gulp');
var styleTask = require('../styles');

gulp.task('elements:styles', () => {
  return styleTask();
});

gulp.task('elements', gulp.series('copy:bower_components'));

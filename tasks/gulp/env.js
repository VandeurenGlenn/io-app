'use strict';
var gulp = require('gulp');

gulp.task('env:dist', cb => {
  GLOBAL.config.env = 'dist';
  GLOBAL.config.dest = 'dist';
  cb();
});

gulp.task('env:dev', cb => {
  GLOBAL.config.env = 'dev';
  GLOBAL.config.dest = '.tmp';
  cb();
});

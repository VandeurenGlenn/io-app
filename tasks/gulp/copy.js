'use strict';
var gulp = require('gulp');

gulp.task('copy:bower_components', cb => {
  var path;
  if (GLOBAL.config.env === 'dev') {
    path = ['src/bower_components/**/*.{js,html}'];
  } else {
    // get every file that can not be vulcanized
    path = ['src/bower_components/**/*.js'];
  }
  gulp.src(path)
  .pipe(gulp.dest(`${GLOBAL.config.dest}/bower_components`).on('end', () => {
    return cb();
  }));
});

// copy components to temporary folder
gulp.task('copy', gulp.series('copy:bower_components'));

'use strict';
var gulp = require('gulp');

gulp.task('copy:bower_components', cb => {
  gulp.src('src/bower_components/**/*.{js,html}').pipe(gulp.dest('.tmp/bower_components')).on('end', () => {
    return cb();
  });
});

// copy components to temporary folder
gulp.task('copy', gulp.series('copy:bower_components'));

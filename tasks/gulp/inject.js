'use strict';
var gulp = require('gulp');
var replace = require('gulp-replace');
var settings = require('./../settings')();

gulp.task('appname', cb => {
  gulp.src(`${GLOBAL.config.dest}/**/*`)
    .pipe(replace(settings.injectTags.appname, settings.appname))
    .pipe(gulp.dest(GLOBAL.config.dest))
    .on('end', () => {
      cb();
    });
});

gulp.task('inject', gulp.series('appname', 'contributors'));

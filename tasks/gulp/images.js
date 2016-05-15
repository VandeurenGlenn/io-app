'use strict';
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var size = require('gulp-size');

var imageOptimizeTask = function(src, dest) {
  return gulp.src(src)
    .pipe(imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest(dest))
    .pipe(size({title: 'images'}));
};

gulp.task('images', function() {
  return imageOptimizeTask('src/images/**/*', GLOBAL.config.dist('images'));
});

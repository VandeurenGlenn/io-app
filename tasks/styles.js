
'use strict';
// Require Gulp & tools we'll use
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

var styleTask = function() {
  var size = $.size;
  return gulp.src([`${GLOBAL.config.src}/**/*.css`])
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe($.minifyCss())
    .pipe($.license(GLOBAL.config.license, GLOBAL.config.licenseOptions))
    .pipe(size({title: 'styles: '}))
    .pipe(gulp.dest(GLOBAL.config.temp))
    .pipe(gulp.dest(GLOBAL.config.dest));
};

// Compile and automatically prefix stylesheets
gulp.task('styles', function() {
  return styleTask('styles', ['**/*.css']);
});

module.exports = styleTask;

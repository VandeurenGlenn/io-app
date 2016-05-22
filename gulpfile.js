'use strict';

// Include promise polyfill for node 0.10 compatibility
require('es6-promise').polyfill();
var Ragin = require('K:\\Webdesign\\DeveloperRagin\\ragin');
// Require Gulp & tools we'll use
var gulp = require('gulp');
var config = require('./tasks/config')();

// Require whole directory's
// Require every task in the tasks directory
require('require-dir')('tasks/gulp');

gulp.task('ragin', () => {
  return new Ragin({componentsPath: 'src/bower_components'});
});

// Clean, handle images, styles, scripts etc...
gulp.task('build',
  gulp.series('clean',
  gulp.parallel('images',
  'styles', 'scripts',
  'elements', 'ES6'),
  gulp.series('inject')));

// Prepare for distribution.
gulp.task('default',
  gulp.series('env:dist', 'build'));

// Watch files for changes & reload
gulp.task('serve',
  gulp.series('env:dev', 'build',
  gulp.parallel('watch:dev', 'browser-sync:app', 'ragin')));

// Watch files for changes & reload
gulp.task('serve:dist',
  gulp.series('env:dist', 'build', 'vulcanize',
  gulp.parallel('watch:dist', 'browser-sync:app', 'ragin')));

'use strict';

// Include promise polyfill for node 0.10 compatibility
require('es6-promise').polyfill();
var ragin = require('K:\\Webdesign\\DeveloperRagin\\ragin');
// Require Gulp & tools we'll use
var gulp = require('gulp');
var config = require('./tasks/config')();

// Require whole directory's
// Require every task in the tasks directory
require('require-dir')('tasks/gulp');

gulp.task('ragin', () => {
  return new ragin({componentsPath: 'src/bower_components'});
});

// Watch files for changes & reload
gulp.task('default',
  gulp.series('clean',
  gulp.parallel('images',
  'styles', 'scripts',
  'elements', 'ES6'),
  gulp.series('contributors')));

// Watch files for changes & reload
gulp.task('serve',
  gulp.series('default', gulp.parallel('watch', 'browser-sync:app', 'ragin')));

// gulp.task('todo', gulp.series('todo:default', 'ES6:todo', 'json:todo', gulp.parallel('watch:todo', 'browser-sync:todo')));

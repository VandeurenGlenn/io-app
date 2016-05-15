'use strict';
var gulp = require('gulp');
var browserSync = require('../browser-sync');

gulp.task('browser-sync:todo', () => {
  return browserSync(GLOBAL.config.todo.server.port, GLOBAL.config.todo.server.logPrefix, GLOBAL.config.todo.server.snippetMatch, GLOBAL.config.todo.server.baseDir);
});

gulp.task('browser-sync:app', () => {
  return browserSync(GLOBAL.config.server.port, GLOBAL.config.server.logPrefix, GLOBAL.config.server.snippetMatch, GLOBAL.config.server.baseDir);
});

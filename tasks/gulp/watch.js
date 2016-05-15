'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');

var reload = () => {
  browserSync.reload();
};

var watch = obj => {
  gulp.watch(obj.path, obj.run);
  // gulp.watch(['src/styles/**/*.css'], gulp.series('styles', 'reload'));
  // gulp.watch(['src/scripts/**/*.js', 'src/scripts/*'], gulp.series('ES6', 'reload'));
  // gulp.watch(['src/images/**/*'], gulp.series('images', 'reload'));
};

gulp.task('watch', () => {
  var paths = [{
    path: ['src/**/*.html', '!src/bower_components/**/*.html'],
    run: gulp.series('ES6', 'inject', 'reload')
  }, {
    path: ['src/styles/**/*.css'],
    run: gulp.series('styles', 'reload')
  }, {
    path: ['src/scripts/**/*.js', 'src/scripts/*'],
    run: gulp.series('ES6', 'reload')
  }, {
    path: ['src/images/**/*'],
    run: gulp.series('images', 'reload')
  }];
  paths.forEach(obj => {
    watch(obj);
  });
});

gulp.task('watch:todo', () => {
  gulp.watch(['todos.json'], gulp.series('reload'));
  gulp.watch(['todo/*'], gulp.series('ES6:todo', 'reload'));
});

gulp.task('reload', cb => {
  reload();
  return cb();
});

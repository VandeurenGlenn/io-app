'user strict';
var gulp = require('gulp');
var del = require('del');
// var dist = require('./dist');

gulp.task('clean:dist', cb => {
  del([GLOBAL.config.dest], {dot: true})
  .then(function() {
    cb();
  });
});

gulp.task('clean:tmp', cb => {
  del(['.tmp'], {dot: true})
  .then(function() {
    cb();
  });
});

gulp.task('clean:ragin', cb => {
  del(['.ragin'], {dot: true})
  .then(function() {
    cb();
  });
});

// Clean output directory
gulp.task('clean', gulp.parallel('clean:dist', 'clean:tmp'));

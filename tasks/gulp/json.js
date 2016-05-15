'use strict';
var gulp = require('gulp');

gulp.task('json:todo', () => {  
  return gulp.src(['todo/*.json'])
    .pipe(gulp.dest('.tmp/todo'));
});

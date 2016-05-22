'use-strict';
var gulp = require('gulp');
var vulcanize = require('gulp-vulcanize');
var crisper = require('gulp-crisper');

gulp.task('copyEls', cb => {
  gulp.src(`${GLOBAL.config.src}/bower_components/**/*.{html,js,css}`)
  .pipe(gulp.dest(`${GLOBAL.config.dest}/bower_components`).on('end', () => {
    return cb();
  }));
});

gulp.task('removeEls', gulp.series('clean:vulcanize', 'copy:bower_components'));

gulp.task('vulcanize:task', () => {
  return gulp.src([`${GLOBAL.config.dest}/index.html`])
          .pipe(vulcanize({
            inlineCss: true,
            inlineScripts: true
          }))
          .pipe(crisper({scriptInHead: false})) // Extract JS from .html files
          .pipe(gulp.dest(GLOBAL.config.dest));
});

gulp.task('vulcanize',
  gulp.series('copyEls', 'vulcanize:task', 'removeEls', 'elements'));

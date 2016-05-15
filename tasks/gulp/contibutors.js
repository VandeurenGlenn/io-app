'use strict';
var gulp = require('gulp');
var fs = require('fs');
var github = require('./../github');
var replace = require('gulp-replace');
var settings = require('./../settings')();

var injectTask = (contributors, cb) => {
  fs.writeFileSync('src/contributors.json', contributors);
  return gulp.src('.tmp/**/*')
    .pipe(replace(/'@inject:contributors'/g, contributors))
    .pipe(gulp.dest('.tmp'))
    .pipe(gulp.dest(GLOBAL.config.dest))
    .on('end', () => {
      cb();
    });
};

gulp.task('contributors:get', cb => {
  if (settings.github) {
    github.contributors(settings.repo).then(contributors => {
      if (JSON.parse(contributors).message && JSON.parse(contributors).message.includes('API rate limit exceeded')) {
        console.warn('contributors aren\'t updated\nAPI rate limit exceeded\nFalling back to contributors.json file');
        injectTask(fs.readFileSync('src/contributors.json', 'utf-8'), () => {
          cb();
        });
      } else {
        // fs.writeFileSync('src/contributors.json', contributors);
        if (!contributors.length) {
          contributors = [""];
        }

        injectTask(contributors, () => {
          cb();
        });
      }
    });
  } else if (settings.contributors) {
    var _contributors = [];
    if (settings.contributors.length) {
      _contributors = settings.contributors;
    }
    injectTask(_contributors, () => {
      cb();
    });
  }
});

gulp.task('contributors',
  gulp.series('contributors:get'));

'use strict';
var gulp = require('gulp');
var fs = require('fs');
var settings = require('./../settings')();
var github = require('./../github')({repo: settings.repo});
var replace = require('gulp-replace');

if (settings.files &&
    settings.files.contributors &&
    settings.files.contributors.write) {
  GLOBAL.CONTRIBUTORS_CONFIG = settings.files.contributors;
}

/**
 * injects the contributors into your app using the choosen 'inject-tag'
 * Example: '@inject:contributors'
 * This can be configured in the [.ioconfig](/.ioconfig) file
 * @param {string} contributors an string array
 * @return {Promise} returns an promise
 * @alias tasks/contributors
 */
var injectTask = contributors => {
  return new Promise(function(resolve, reject) {
    try {
      if (!JSON.parse(contributors).length) {
        contributors = [];
      }
      gulp.src(`${GLOBAL.config.dest}/**/*`)
        .pipe(replace(/'@inject:contributors'/g, contributors))
        .pipe(gulp.dest(GLOBAL.config.dest))
        .on('end', () => {
          resolve(contributors);
        });
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * Reads the contributors file
 *
 * @param {object} config {name: String, dest: String, write: Boolean, inject: RegExp}
 * @return {Promise} return an promise with contributors or an error
 */
var readTask = config => {
  return new Promise(function(resolve, reject) {
    try {
      var contributors = fs.readFileSync(`${config.dest}/${config.name}.json`);
      resolve(contributors);
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * Writes the contributors file
 *
 * @param {array} contributors an array containing the contributors
 * @param {object} config {name: String, dest: String, write: Boolean, inject: RegExp}
 * @return {Promise} returns an promise
 */
var writeTask = (contributors, config) => {
  return new Promise(function(resolve, reject) {
    try {
      if (settings.files &&
        settings.files.contributors &&
        settings.files.contributors.write) {
        fs.writeFileSync(`${config.dest}/${config.name}.json`, contributors);
      }
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * Try's to get the contributors from github
 *
 * @param {object} config {name: String, dest: String, write: Boolean, inject: RegExp}
 * @return {Promise} returns an promise
 */
var getGithubRepoContributors = config => {
  return new Promise(function(resolve, reject) {
    github.contributors.then(contributors => {
      injectTask(contributors)
      .then(writeTask(contributors, config)
        .then(() => {
          resolve();
        }));
    })
    .catch(err => {
      reject(err);
    });
  });
};

var githubContributorsTask = config => {
  return new Promise(function(resolve, reject) {
    getGithubRepoContributors(config)
    .then(() => {
      resolve();
    })
    .catch(() => {
      // something wen't wrong getting the contributors, falling back to .json file (if it exist already)
      try {
        readTask(config).then(contributors => {
          injectTask(contributors).then(() => {
            resolve();
          });
        });
      } catch (err) {
        reject(err);
      }
    });
  });
};

/**
 * Returns an Array of the contributors, control wether or not to write a file, in [.ioconfig](/.ioconfig) @line:10
 * @mixin settings
 * @mixin github
 * @mixin gulp-tasks
 */
gulp.task('contributors:get', cb => {
  var config = {
    dest: GLOBAL.CONTRIBUTORS_CONFIG.dest,
    name: GLOBAL.CONTRIBUTORS_CONFIG.name
  };
  var url = '[.ioconfig](.ioconfig)';
  // we don't wanne spam the github api for every change we do
  if (GLOBAL.config.env === 'dev') {
    console.log(`getting contributors file ${config.name}.json
        from ${config.dest}
        defined in ${url} file it's 'files' (object)`);
    // check if there is an contributors.json file
    readTask(config).then(contributors => {
      // inject the contributors
      injectTask(contributors).then(() => {
        cb();
      });
    }).catch(() => {
      console.warn(`no contributors.json file found
      trying to get data from github`);
      // when github is enabled in settings
      if (settings.github) {
      // try getting the contributors from github
        console.log(`getting contributors from Github (${url} file)`);
        githubContributorsTask(config).then(() => {
          cb();
        });
      }
    });
  } else if (settings.github) {
    // get the contributors from github
    console.log(`getting contributors from Github (${url} file)`);
    githubContributorsTask(config).then(() => {
      cb();
    });
  } else if (settings.contributors) {
    console.log(`getting contributors from settings (${url} file)`);
    // get the contributors from setting
    injectTask(settings.contributors, () => {
      cb();
    });
  } else {
    console.log(`getting contributors file ${config.name}.json
        from ${config.dest}
        defined in ${url} file it's 'files' (object)`);
    readTask(config).then(contributors => {
      // inject the contributors
      injectTask(contributors).then(() => {
        cb();
      });
    }).catch(() => {
      console.log(`no contributors file found:
        file: ${config.name}.json
        path: ${config.dest}
        defined in ${url} file it's 'files' (object)`);
      cb();
    });
  }
});

gulp.task('contributors',
  gulp.series('contributors:get'));

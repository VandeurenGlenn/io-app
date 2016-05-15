'use strict';
var gulp = require('gulp');
var fs = require('fs');
var notify = require('gulp-notify');
var ensure = require('./ensure-file');

var files;

var set = (file, version) => {
  for (var i = 0; i < files.length; i++) {
    if (!file[i].version) {
      file[i].version = version;
      fs.writeFileSync('./package.json', JSON.stringify(file[i], null, '\t'));
    }
  }
};

var ensureFile = (path, o) => {
  ensure(path).then((file) => {
    if (o && o['return-file']) {
      return file;
    }
    return path;
  }).catch((err) => {
    if (o && o.write) {
      // create a new file if the file doesn't exist
      fs.writeFileSync(path, o.write);
      console.log('a new file was created@: ' + o.write);
      return path;
    }
      console.log(err);
  });
};

var ensureFiles = (paths) => {
  return new Promise(function(resolve, reject) {
    for (var i = 0; i < paths.length; i++) {
      var opts = {};
      if (paths[i].write) {
        opts.write = paths[i].write;
      }
      resolve(ensureFile(paths[i].path, opts));
    }
    reject('no file found for path: ' + paths[i].path);
  });
};

var paths = () => {
  return [{
    'path': './' + GLOBAL.config.src + '/VERSION.txt',
    'write': GLOBAL.config.version
  },{
    'path': './package.json'
  },{
    'path': './bower.json'
  }];
};

var getFile = (path) => {
  var file = JSON.parse(fs.readFileSync(path));
  if (file) {
    return file;
  }
  console.log('error getting the file');
};

var getFiles = (files) => {
  var _files = [];
  for (var i = 0; i < files.length; i++) {
    if (files[i].path !== './src/VERSION.txt') {
      _files.push(getFile(files[i].path));
    }
  }
  return _files;
};

gulp.task('ensure-files', (cb) => {
  ensureFiles(paths()).then(() => {
    return cb();
  });
});

gulp.task('get-files', (cb) => {
  files = getFiles(paths());
    console.log(files);
  return cb();
});

gulp.task('set-version', (cb) => {
  set(files, GLOBAL.config.version);
  return cb();
});

gulp.task('show-version', (cb) => {
  gulp.src(GLOBAL.config.src + '/VERSION.txt')
  .pipe(notify({
    onLast: true,
    message: () => `version: ${GLOBAL.config.version}`
  }));
  return cb();
});

gulp.task('version', gulp.series('ensure-files', 'get-files', 'set-version', 'show-version'));

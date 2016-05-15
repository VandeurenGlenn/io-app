'use strict';
var fs = require('fs');

var ensureFile = file => {
  return new Promise((resolve, reject) => {

    fs.access(file, fs.R_OK, (err) => {
      if (err) {
        console.warn('no access!');
        reject(file);
      }
      resolve(file);
    });
  });
};

module.exports = ensureFile;

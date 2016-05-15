'use strict';

var curl = require('./curl');

module.exports = class Github {
  constructor() {
    return new Github();
  }

  static contributors(repo) {
    return new Promise(function(resolve, reject) {
      try {
        curl({url: `https://api.github.com/repos/${repo}/contributors`}).then(result => {
          resolve(result);
        });
      } catch (err) {
        reject(err);
      }
    });
  }
};

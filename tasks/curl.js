'use strict';
var exec = require('child_process').exec;
var prompt = require('./prompt');

var execCurl = opts => {
  return new Promise(function(resolve, reject) {
    var cmd;
    if (opts.auth) {
      cmd = `curl -u ${opts.auth}:${opts.pwd} ${opts.url}`;
    } else {
      cmd = `curl ${opts.url}`;
    }
    exec(cmd, (err, stdout) => {
      if (err) {
        reject(err);
      }
      resolve(stdout);
    });
  });
};

module.exports = opts => {
  return new Promise(function(resolve, reject) {
    try {
      if (opts.auth) {
        if (!opts.password) {
          prompt([{
            question: 'What is your password?',
            name: 'password'
          }]).then(answers => {
            opts.password = answers.password;
            execCurl({
              auth: opts.auth,
              pwd: answers.password,
              url: opts.url
            }).then(result => {
              resolve(result);
            });
          });
        }
      } else {
        execCurl({url: opts.url}).then(result => {
          resolve(result);
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};

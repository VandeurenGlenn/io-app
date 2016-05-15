'use strict';
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

var question = (question, name) => {
  return new Promise(function(resolve, reject) {
    try {
      rl.question(question, answer => {
        resolve({
          name: name,
          answer: answer
        });
        rl.close();
        process.stdin.destroy();
      });
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = opts => {
  return new Promise((resolve, reject) => {
    var answers = [];
    var calls = 0;
    opts.forEach(opt => {
      if (!opt.name) {
        reject('prompt.js::name argument required');
      }
      if (opt.question) {
        question(opt.question, opt.name).then(result => {
          calls += 1;
          answers[result.name] = result.answer;
          if (opts.length === calls) {
            resolve(answers);
          }
        });
      }
    });
  });
};

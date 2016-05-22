'use strict';
var GithubApi = require('github-api');
var gh = new GithubApi();
class Github {
  constructor(opts) {
    this.opts = opts;
    this.repo = this._repo;
    // this.contributors = this._contributors;
  }

  get _repo() {
    return gh.getRepo(this.opts.repo);
  }

  get contributors() {
    return new Promise(function(resolve, reject) {
      this.repo.getContributors().then(promise => {
        var contributors = JSON.stringify(promise.data, null, 2);
        var parsedContributors = JSON.parse(contributors);
        if (parsedContributors.message) {
          if (parsedContributors.message.includes('API rate limit exceeded')) {
            var warn = 'contributors aren\'t updated\nAPI rate limit exceeded';
            console.warn(warn);
          }
          reject();
        } else if (!parsedContributors.length) {
          contributors = [""];
        }
        resolve(contributors);
      });
    }.bind(this));
  }
}

module.exports = opts => {
  return new Github(opts);
};

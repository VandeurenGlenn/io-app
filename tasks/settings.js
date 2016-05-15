'use strict';
var fs = require('fs');

class Settings {
  constructor(opts) {
    if (opts && opts.sources) {
      this.sources = opts.sources;
    } else {
      this.sources = [];
    }
    if (!this.sources.io) {
      this.sources.io = './.ioconfig';
    }
    if (!this.sources.bower) {
      this.sources.bower = './bower.json';
    }
    if (!this.sources.package) {
      this.sources.package = './package.json';
    }
    this.ioFile = JSON.parse(fs.readFileSync(this.sources.io));
    this.bowerFile = JSON.parse(fs.readFileSync(this.sources.bower));
    this.packageFile = JSON.parse(fs.readFileSync(this.sources.bower));

    this.repo = this._repo;
  }

  get github() {
    return this.ioFile.inject.plugins.github;
  }

  get _repo() {
    var bowerFile = fs.readFileSync('bower.json');
    return this.bowerFile.homepage.replace('https://github.com/', '');
  }
}

module.exports = opts => {
  return new Settings(opts);
};

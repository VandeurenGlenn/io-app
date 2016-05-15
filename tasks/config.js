'use strict';
var fs = require('fs');
var path = require('path');

var bowerFile = JSON.parse(fs.readFileSync('./bower.json', 'utf8'));
var DIST = GLOBAL.config ? GLOBAL.config.dest : 'dist';

module.exports = function() {
  GLOBAL.config = {
    src: 'src',
    dest: 'dist',
    temp: '.tmp',
    dist: function(subpath) {
      return subpath ? path.join(DIST, subpath) : DIST;
    },
    version: bowerFile.version,
    server: JSON.parse(fs.readFileSync('./.server-config', 'utf8')),
    settings: JSON.parse(fs.readFileSync('./.ioconfig', 'utf8')),
    license: 'MIT',
    licenseOptions: {
      organization: 'Trendystore, All rights reserved.'
    }
  };
};

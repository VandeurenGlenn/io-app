'use strict';
var fs = require('fs');

var bowerFile = JSON.parse(fs.readFileSync('./bower.json', 'utf8'));
var DEST = GLOBAL.config ? GLOBAL.config.dest : 'dist';

module.exports = function() {
  GLOBAL.config = {
    src: 'src',
    dest: DEST,
    dist: 'dist',
    temp: '.tmp',
    env: 'dev',
    CSP_ALL: false,
    version: bowerFile.version,
    server: JSON.parse(fs.readFileSync('./.server-config', 'utf8')),
    settings: JSON.parse(fs.readFileSync('./.ioconfig', 'utf8')),
    license: 'MIT',
    licenseOptions: {
      organization: 'Trendystore, All rights reserved.'
    }
  };
};

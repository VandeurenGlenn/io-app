var browserSync = require('browser-sync');
var historyApiFallback = require('connect-history-api-fallback');

module.exports = (port, logPrefix, snippetMatch, baseDir) => {
  return browserSync({
    port: port,
    ui: {
      port: (port + 1)
    },
    notify: false,
    logPrefix: logPrefix,
    snippetOptions: {
      rule: {
        match: snippetMatch,
        fn: function(snippet) {
          return snippet;
        }
      }
    },
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: {
      baseDir: GLOBAL.config.dest,
      middleware: [historyApiFallback()]
    }
  });
};

/* jshint node: true */
'use strict';

var JanusSession = require('./session');

module.exports = function(uri, opts, callback) {
  var session;

  if (typeof opts == 'function') {
    callback = opts;
    opts = {};
  }

  // create the new janus session
  session = new JanusSession(opts);

  // connect
  session.connect(uri, function(err) {
    if (err) {
      return callback(err);
    }

    callback(null, session);
  });

  return session;
};
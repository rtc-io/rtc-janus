/* jshint node: true */
'use strict';

var JanusSession = require('./session');

module.exports = function(url, opts, callback) {
  // create the new janus session
  var session = new JanusSession(opts);

  // handle initialization and errors
  session.once('init', callback);
  session.once('error', callback);

  // connect
  session.connect(url);

  return session;
};
/* jshint node: true */
'use strict';

/**
  # rtc-janus

  An in progress node and browserify compatible integration layer for the
  [janus WebRTC Gateway](https://github.com/meetecho/janus-gateway).

  ## Example Usage

  <<< examples/streaming.js

  ## Reference

**/

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
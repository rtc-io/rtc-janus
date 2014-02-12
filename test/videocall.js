var janus = require('../');
var test = require('tape');
var session;
var baseUrl = require('./helpers/url');

test('create a new session', function(t) {
  t.plan(2);

  session = janus(baseUrl, function(err) {
    t.ifError(err);
    t.ok(session.id, 'got valid session id');
  });
});

test('request the videocall plugin', function(t) {
  t.plan(2);

  session.activate('videocall', function(err) {
    t.ifError(err);

    // ensure the session plugins videocall is active
    t.ok(session.plugins.videocall, 'video call plugin activated');
  });
});
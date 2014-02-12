var JanusSession = require('../session');
var test = require('tape');
var session;
var baseUrl = require('./helpers/url');
var janus = require('../');

test('create a new session', function(t) {
  t.plan(1);
  session = new JanusSession();
  t.ok(session instanceof JanusSession, 'session instance created');
});

test('attempt connection with server', function(t) {
  t.plan(2);

  // attempt connection
  session.connect(baseUrl, function(err) {
    t.ifError(err);
    t.ok(session.id, 'assigned session id');
  });
});

test('create a session through the main janus module entry point', function(t) {
  t.plan(2);

  janus(baseUrl, function(err, s) {
    t.ifError(err);
    t.ok(s.id, 'assigned session id');
  });
});
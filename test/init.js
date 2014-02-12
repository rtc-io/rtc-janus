var JanusSession = require('../session');
var test = require('tape');
var session;
var baseUrl = process.env.JANUS_URL || 'http://localhost:8088/janus';

test('create a new session', function(t) {
  t.plan(1);
  session = new JanusSession(baseUrl);
  t.ok(session instanceof JanusSession, 'session instance created');
});
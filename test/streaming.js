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

test('request the streaming plugin', function(t) {
  t.plan(2);

  session.activate('streaming', function(err) {
    t.ifError(err);

    // ensure the session plugins videocall is active
    t.ok(session.plugins.streaming, 'streaming plugin activated');
  });
});

test('request the steaming session list', function(t) {
  t.plan(2);

  session.streaming({ request: 'list' }, function(err, data) {
    t.ifError(err);
    t.ok(data && data.list, 'got expected response');
  });
});

test('disconnect session', function(t) {
  t.plan(1);
  session.disconnect(function(err) {
    t.ifError(err, 'ok');
  });
});
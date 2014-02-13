var janus = require('../');
var test = require('tape');
var session;
var baseUrl = require('./helpers/url');
var streamList;

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
  t.plan(4);

  session.streaming({ request: 'list' }, function(err, data) {
    t.ifError(err);
    t.ok(data && data.list, 'got expected response');
    t.ok(Array.isArray(data.list), 'list is a valid array');
    t.ok(data.list.length > 0, 'have valid stream information');

    streamList = data.list;
  });
});

test('ensure we have stream 2 to test against', function(t) {
  t.plan(1);
  targetStream = streamList.filter(function(stream) {
    return stream.id === 2;
  })[0];
  t.ok(targetStream, 'have test stream (id == 2)');
});

test('request stream play', function(t) {
  t.plan(3);
  session.streaming({ request: 'watch', id: 2 }, function(err, data) {
    t.ifError(err);
    t.ok(data && data.status === 'preparing', 'preparing stream');
    t.ok(data.jsep, 'got jsep data in response');
  });
});

test('disconnect session', function(t) {
  t.plan(1);
  session.disconnect(function(err) {
    t.ifError(err, 'ok');
  });
});
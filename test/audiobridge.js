var janus = require('../');
var test = require('tape');
var randomName = require('random-name');
var session;
var baseUrl = require('./helpers/url');
var roomId;

test('create a new session', function(t) {
  t.plan(2);

  session = janus(baseUrl, function(err) {
    t.ifError(err);
    t.ok(session.id, 'got valid session id');
  });
});

test('request the audiobridge plugin', function(t) {
  t.plan(2);

  session.activate('audiobridge', function(err) {
    t.ifError(err);

    // ensure the session plugins videocall is active
    t.ok(session.plugins.audiobridge, 'audiobridge plugin activated');
  });
});

test('request a new room', function(t) {
  var data = {
    request: 'create',
    description: 'My Awesome Test Room',
    sampling: 16000,
    record: false
  };

  t.plan(3);
  session.audiobridge(data, function(err, response) {
    t.ifError(err);
    t.ok(response && response.audiobridge === 'created', 'created ok');

    // save the room id
    t.ok(roomId = response.room, 'got room id');
  });
});

test('participant #1 join the new room', function(t) {
  var data = {
    request: 'join',
    room: roomId,
    display: randomName()
  };

  t.plan(4);
  session.audiobridge(data, function(err, response) {
    t.ifError(err);
    t.ok(response && response.audiobridge === 'joined', 'joined ok');
    t.equal(response.room, roomId, 'joined correct room');
    t.equal(response.participants.length, 0, 'we are the first participant');
  });
});

test('participant #2 join the new room', function(t) {
  var data = {
    request: 'join',
    room: roomId,
    display: randomName()
  };

  t.plan(4);
  session.audiobridge(data, function(err, response) {
    t.ifError(err);
    t.ok(response && response.audiobridge === 'joined', 'joined ok');
    t.equal(response.room, roomId, 'joined correct room');
    t.equal(response.participants.length, 1, 'we are the second participant');
  });
});

test('disconnect session', function(t) {
  t.plan(1);
  session.disconnect(function(err) {
    t.ifError(err, 'ok');
  });
});
/* jshint node: true */
'use strict';

var EventEmitter = require('events').EventEmitter;
var util = require('util');
var request = require('hyperquest');
var uuid = require('uuid');

function JanusSession(opts) {
  if (! (this instanceof JanusSession)) {
    return new JanusSession(opts);
  }

  // create the session id
  this.id = (opts || {}).id || uuid.v4();

  // set the url to null
  this.url = null;
}

util.inherits(JanusSession.prototype, EventEmitter);
module.exports = JanusSession;

var proto = JanusSession.prototype;

proto.connect = function(url, opts) {
  var req = request({ url: url, method: 'POST' });

  // update the url
  this.url = url;

  req.write({
    janus: 'create',
    transaction: this.id
  });

  req.on('response', function(res) {
    console.log('got response: ', res);
  });

  req.end();
};
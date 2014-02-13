var async = require('async');
var janus = require('..');

janus('http://localhost:8088/janus', function(err, session) {
  if (err) {
    return console.error(err);
  }

  // activate the required plugins
  async.map(
    ['streaming', 'videocall'],
    session.activate.bind(session),
    function(err) {
      console.log(arguments);
    }
  );
});
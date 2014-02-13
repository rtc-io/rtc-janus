# rtc-janus

An in progress node and browserify compatible integration layer for the
[janus WebRTC Gateway](https://github.com/meetecho/janus-gateway).


[![NPM](https://nodei.co/npm/rtc-janus.png)](https://nodei.co/npm/rtc-janus/)

[![Build Status](https://travis-ci.org/rtc-io/rtc-janus.png?branch=master)](https://travis-ci.org/rtc-io/rtc-janus)
[![experimental](http://hughsk.github.io/stability-badges/dist/experimental.svg)](http://github.com/hughsk/stability-badges)

## Example Usage

```js
var async = require('async');
var janus = require('rtc-janus');

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
```

## Reference

### JanusSession

Create a new JanusSession instance

#### activate(namespace, callback)

Activate the specified plugin.  A plugin can be specified by it's full
namespace (e.g. `janus.plugin.streaming`) or if it is a standard janus
plugin through just it's id (e.g. `streaming`).

#### connect(uri, callback)

Create a new connection to the janus gateway

#### disconnect(callback)

Disconnect from the gateway

## License(s)

### Apache 2.0

Copyright 2014 National ICT Australia Limited (NICTA)

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

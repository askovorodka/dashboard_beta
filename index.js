'use strict';
require('babel-register')({ presets: ['es2015', 'stage-0'] });
require('babel-polyfill');

var server = require('./server.js').default;
var port = 3333;

server.listen(port, function () {
  console.log('Example app listening on port '+port +'!');
});

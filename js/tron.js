var RArray = require('r-array')
var Viewport = require('./viewport.js')

var canvas = document.getElementById('canvas')

var data = require('./movement')

function start() {
  var viewport = new Viewport(canvas, data)
}
start()

var reconnect = require('reconnect/shoe')

reconnect(function (stream) {
  stream.pipe(moves.createStream()).pipe(stream)
}).connect('/shoe')


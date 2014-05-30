var RArray = require('r-array')
var Viewport = require('./viewport.js')

var canvas = document.getElementById('canvas')

var moves = require('./movement')

function start() {
  var viewport = new Viewport(canvas, moves)
}
start()

var reconnect = require('reconnect/shoe')

reconnect(function (stream) {
  console.log('connection', stream)
  stream.pipe(moves.createStream()).pipe(stream)
}).connect('/shoe')

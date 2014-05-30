var Viewport = require('./viewport.js')

var canvas = document.getElementById('canvas')

var moves = require('./movement')

function start() {
  var viewport = new Viewport(canvas, moves)
}

start()

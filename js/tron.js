var RArray = require('r-array')
var Viewport = require('./viewport.js')

var canvas = document.getElementById('canvas')

var data = new RArray()
var viewport = new Viewport(canvas)

start()

var RArray = require('r-array')
var toM = 1800*60

var movement = new RArray()
var last = {}

navigator.geolocation.watchPosition(function (pos) {
  var coords = {
    x: pos.coords.latitude*toM,
    y: pos.coords.longitude*toM,
    ts: Date.now()
  }

  if(coords.x != last.x || coords.y != last.y) {
    console.log(JSON.stringify(coords))
    console.log('movement?', movement)
    movement.push(coords)
  }

}, console.error.bind(console), {enableHighAccuracy: true})


module.exports = movement

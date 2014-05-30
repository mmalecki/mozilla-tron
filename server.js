var shoe = require('shoe')

var http = require('http')
var ecstatic = require('ecstatic')

var server = http.createServer(ecstatic(__dirname)).listen(8000)

var RArray = require('r-array')
var r = new RArray()

shoe(function (stream) {
  stream.pipe(r.createStream()).pipe(stream)
}).install(server, '/shoe')

r.on('_update', function (u) {
  console.log(u)
})

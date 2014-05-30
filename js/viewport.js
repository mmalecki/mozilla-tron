var degToRad = require('./deg-to-rad.js')

var Viewport = module.exports = function (canvas, data) {

  this.context = canvas.getContext('2d')
  this.data = data

  var self = this
  //pull the last update out of object...
  this.data.on('_update', function (u) {
    for(var k in u[0])
      return self._onDataUpdate(u[0][k])
  })
  window.addEventListener('resize', this._resizeCanvas.bind(this))
  window.addEventListener('deviceorientation', this._onOrientation.bind(this), true)

  this._maxX = this._maxY = -Infinity
  this._minX = this._minY = Infinity

  this._resizeCanvas()
  this._requestAnimationFrame()
}

Viewport.prototype._requestAnimationFrame = function () {
  this._redraw()
  window.requestAnimationFrame(this._requestAnimationFrame.bind(this))
}

Viewport.prototype._onDataUpdate = function () {
  var update = this.data.get(this.data.last())
  if (update.x > this._maxX) this._maxX = update.x
  if (update.y > this._maxY) this._maxY = update.y
  if (update.x < this._minX) this._minX = update.x
  if (update.y < this._minY) this._minY = update.y
}

Viewport.prototype._theirsToOurs = function (point) {
  return {
    x: (point.x / (this._maxX - this._minX)) * this.width - (this.width / 2),
    y: (point.y / (this._maxY - this._minY)) * this.height - (this.height / 2)
  }
}

Viewport.prototype._onOrientation = function (orientation) {
  this._alpha = orientation.alpha
  this._redraw()
}

Viewport.prototype._resizeCanvas = function () {
  this.width = canvas.width = window.innerWidth
  this.height = canvas.height = window.innerHeight
}

Viewport.prototype._drawMap = function () {
  var xScale = (this._maxX - this._minX)/ 600//this.context.canvas.width
  var yScale = (this._maxY - this._minY)/ 400 //this.context.canvas.height
  var mX = this._minX
  var mY = this._minY
  console.log('scale', xScale, yScale, mX, mY)

  this.data.forEach(function (point) {
    this.context.fillStyle = 'red' //hashStringToColor(point.player)
    //this.context.arc(coords.x, coords.y, 10, 0, 2 * Math.PI)
    console.log('COORDS', (point.x - mX)/xScale, (point.y - mY)*yScale)
    this.context.fillRect((point.x - mX)/xScale, (point.y - mY)/yScale, 10, 10)

    this.context.fill()

  }.bind(this))
}

Viewport.prototype._redraw = function () {
  this.context.fillStyle = 'rgb(0, 0, 0)'
  this.context.fillRect(0, 0, this.width, this.height)

  this.context.save()
  this.context.rotate(degToRad(this._alpha))

  this._drawMap()

  this.context.restore()
}

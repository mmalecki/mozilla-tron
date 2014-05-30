var degToRad = require('./deg-to-rad.js')

var Viewport = module.exports = function (canvas, data) {

  this.context = canvas.getContext('2d')
  this.data = data

  this.data.on('update', this._onDataUpdate.bind(this))
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
    x: (point.x / (this._maxX - this._minX)) * this.width,
    y: (point.y / (this._maxY - this._minY)) * this.height
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
  this.data.forEach(function (point) {
    var coords = this._theirsToOurs(point)
    this.context.fillStyle = 'rgb(255, 255, 255)'
    this.context.arc(coords.x, coords.y, 10, 0, 2 * Math.PI)
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

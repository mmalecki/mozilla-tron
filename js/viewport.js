var degToRad = require('./deg-to-rad.js')

var Viewport = module.exports = function (canvas) {
  this.context = canvas.getContext('2d')

  window.addEventListener('resize', this._resizeCanvas.bind(this))
  window.addEventListener('deviceorientation', this._onOrientation.bind(this), true)
  this._resizeCanvas()
}

Viewport.prototype._onOrientation = function (orientation) {
  this._alpha = orientation.alpha
  this._redraw()
}

Viewport.prototype._resizeCanvas = function () {
  this.width = canvas.width = window.innerWidth
  this.height = canvas.height = window.innerHeight
}

Viewport.prototype._redraw = function () {
  this.context.fillStyle = 'rgb(0, 0, 0)'
  this.context.fillRect(0, 0, this.width, this.height)

  this.context.save()
  this.context.rotate(degToRad(this._alpha))

  this.context.fillStyle = 'rgb(255, 255, 255)'
  this.context.fillRect(this.width / 2, this.height / 2, 10, 400)

  this.context.restore()
}

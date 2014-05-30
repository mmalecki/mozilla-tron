var Viewport = module.exports = function (canvas) {
  this.context = canvas.getContext('2d')

  window.addEventListener('resize', this._resizeCanvas.bind(this))
  this._resizeCanvas()
}

Viewport.prototype.resizeCanvas = function () {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

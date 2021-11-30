class Arrow {
  constructor(options = {}) {
    const { x = 0, y = 0, length = 40, angle = -Math.PI / 4 } = options

    this.x = x
    this.y = y
    this.length = length
    this.halfLength = length / 2
    this.arrowHeadLength = Math.sin(Math.PI / 4) * this.halfLength
    this.angle = angle
  }

  getBodyStartX() {
    return this.x - Math.cos(this.angle) * this.halfLength
  }

  getBodyStartY() {
    return this.y - Math.sin(this.angle) * this.halfLength
  }

  getBodyEndX() {
    return this.x + Math.cos(this.angle) * this.halfLength
  }

  getBodyEndY() {
    return this.y + Math.sin(this.angle) * this.halfLength
  }

  getLeftHeadX() {
    return this.x - Math.cos(this.angle - Math.PI * 1.25) * this.arrowHeadLength
  }

  getLeftHeadY() {
    return this.y - Math.sin(this.angle - Math.PI * 1.25) * this.arrowHeadLength
  }

  getRightHeadX() {
    return this.x - Math.cos(this.angle + Math.PI * 1.25) * this.arrowHeadLength
  }

  getRightHeadY() {
    return this.y - Math.sin(this.angle + Math.PI * 1.25) * this.arrowHeadLength
  }

  lookAt(x, y) {
    const dx = x - this.x
    const dy = y - this.y

    this.angle = Math.atan2(dy, dx)
  }

  render(context) {
    context.strokeStyle = '#000000'
    context.lineWidth = 1
    context.beginPath()

    context.moveTo(this.getBodyStartX(), this.getBodyStartY())
    context.lineTo(this.getBodyEndX(), this.getBodyEndY())

    context.moveTo(this.getBodyEndX(), this.getBodyEndY())
    context.lineTo(this.getLeftHeadX(), this.getLeftHeadY())

    context.moveTo(this.getBodyEndX(), this.getBodyEndY())
    context.lineTo(this.getRightHeadX(), this.getRightHeadY())

    context.stroke()
  }
}

export default Arrow

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

  getTopHeadX() {
    return this.x - Math.cos(this.angle - Math.PI * 1.25) * this.arrowHeadLength
  }

  getTopHeadY() {
    return this.y - Math.sin(this.angle - Math.PI * 1.25) * this.arrowHeadLength
  }

  getBottomHeadX() {
    return this.x - Math.cos(this.angle + Math.PI * 1.25) * this.arrowHeadLength
  }

  getBottomHeadY() {
    return this.y - Math.sin(this.angle + Math.PI * 1.25) * this.arrowHeadLength
  }

  lookAt(x, y) {
    if (!x || !y) return

    const dx = x - this.x
    const dy = y - this.y

    this.angle = Math.atan2(dy, dx)
  }

  render(context) {
    context.strokeStyle = 'rgba(0, 0, 0, 0.5)'
    context.lineWidth = 5
    context.beginPath()

    context.moveTo(this.getBodyStartX(), this.getBodyStartY())
    context.lineTo(this.getBodyEndX(), this.getBodyEndY())
    context.stroke()

    context.strokeStyle = '#ff0000'
    context.lineWidth = 5
    context.beginPath()
    context.moveTo(this.getBodyEndX(), this.getBodyEndY())
    context.lineTo(this.getTopHeadX(), this.getTopHeadY())
    context.stroke()

    context.strokeStyle = '#ff0000'
    context.lineWidth = 5
    context.beginPath()
    context.moveTo(this.getBodyEndX(), this.getBodyEndY())
    context.lineTo(this.getBottomHeadX(), this.getBottomHeadY())
    context.stroke()

    context.stroke()
  }
}

export default Arrow

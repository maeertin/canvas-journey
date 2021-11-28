class Arm {
  constructor(options = {}) {
    const { x = 0, y = 0, length = 100, angle = 0 } = options

    this.x = x
    this.y = y
    this.length = length
    this.angle = angle
  }

  getEndX() {
    return this.x + Math.cos(this.angle) * this.length
  }

  getEndY() {
    return this.y + Math.sin(this.angle) * this.length
  }

  render(context) {
    context.strokeStyle = '#000000'
    context.lineWidth = 5
    context.beginPath()
    context.moveTo(this.x, this.y)
    context.lineTo(this.getEndX(), this.getEndY())
    context.stroke()
  }

  lookAt(x, y) {
    const dx = x - this.x
    const dy = y - this.y

    this.angle = Math.atan2(dy, dx)
  }

  drag(x, y) {
    this.lookAt(x, y)

    this.x = x - Math.cos(this.angle) * this.length
    this.y = y - Math.sin(this.angle) * this.length
  }
}

export default Arm

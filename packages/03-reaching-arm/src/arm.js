class Arm {
  constructor(options = {}) {
    const { x = 0, y = 0, length = 100, angle = 0, parent } = options

    this.x = x
    this.y = y
    this.length = length
    this.angle = angle
    this.parent = parent
  }

  getEndX() {
    return this.x + Math.cos(this.angle) * this.length
  }

  getEndY() {
    return this.y + Math.sin(this.angle) * this.length
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

    if (this.parent) {
      this.parent.drag(this.x, this.y)
    }
  }

  render(context) {
    context.strokeStyle = '#000000'
    context.lineWidth = 5
    context.beginPath()
    context.moveTo(this.x, this.y)
    context.lineTo(this.getEndX(), this.getEndY())
    context.stroke()
  }
}

export default Arm

class Arm {
  constructor(options = {}) {
    const {
      x = 0,
      y = 0,
      length = 100,
      angle = 0,
      centerAngle = 0,
      rotationRange = Math.PI / 4,
      parent = null,
      phaseOffset = 0,
    } = options

    this.x = x
    this.y = y
    this.length = length
    this.angle = angle
    this.centerAngle = centerAngle
    this.rotationRange = rotationRange
    this.parent = parent
    this.phaseOffset = phaseOffset
  }

  setPhase(phase) {
    this.angle = this.centerAngle + Math.sin(phase + this.phaseOffset) * this.rotationRange
  }

  getEndX() {
    let angle = this.angle
    let parent = this.parent

    while (parent) {
      angle += parent.angle
      parent = parent.parent
    }

    return this.x + Math.cos(angle) * this.length
  }

  getEndY() {
    let angle = this.angle
    let parent = this.parent

    while (parent) {
      angle += parent.angle
      parent = parent.parent
    }

    return this.y + Math.sin(angle) * this.length
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

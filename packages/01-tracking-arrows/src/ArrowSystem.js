import Arrow from './Arrow'

class ArrowSystem {
  constructor(options = {}) {
    const { x = 0, y = 0, radius = 100, lerpAmount = 1 } = options

    this.x = x
    this.y = y
    this.radius = radius
    this.lerpAmount = lerpAmount

    this.arrows = []
    this.targetX = x
    this.targetY = y
  }

  lerp(norm, min, max) {
    return (max - min) * norm + min
  }

  addArrow(length) {
    const arrow = new Arrow({ x: this.x, y: this.y, length })
    this.arrows.push(arrow)

    this.update()
  }

  update() {
    if (this.arrows.length > 1) {
      const slice = (Math.PI * 2) / this.arrows.length
      for (let idx = 0; idx < this.arrows.length; idx++) {
        this.arrows[idx].x = this.x + Math.cos(slice * idx) * this.radius
        this.arrows[idx].y = this.y + Math.sin(slice * idx) * this.radius
      }
    }
  }

  lookAt(x, y) {
    for (let idx = 0; idx < this.arrows.length; idx++) {
      this.arrows[idx].lookAt(x, y)
    }
  }

  follow(x, y) {
    this.lookAt(x, y)
    this.update()

    this.x = this.lerp(this.lerpAmount, this.x, x)
    this.y = this.lerp(this.lerpAmount, this.y, y)
  }

  render(context) {
    for (let idx = 0; idx < this.arrows.length; idx++) {
      this.arrows[idx].render(context)
    }
  }
}

export default ArrowSystem

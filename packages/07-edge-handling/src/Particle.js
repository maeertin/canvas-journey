import Vector2 from './Vector2'

class Particle {
  radius = 0

  constructor(x, y, speed, direction, gravity = 0) {
    this.position = new Vector2(x, y)
    this.velocity = new Vector2(0, 0)
    this.gravity = new Vector2(0, gravity)

    this.velocity.setLength(speed)
    this.velocity.setAngle(direction)
  }

  accelerate(vec) {
    this.velocity.addTo(vec)
  }

  update() {
    this.velocity.addTo(this.gravity)
    this.position.addTo(this.velocity)
  }
}

export default Particle

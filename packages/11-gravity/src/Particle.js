class Particle {
  constructor(options = {}) {
    const {
      bounce = -1,
      direction = 0,
      friction = 1,
      gravity = 0,
      mass = 1,
      radius = 0,
      speed = 0,
      x = 0,
      y = 0,
    } = options

    this.x = x
    this.y = y
    this.vx = Math.cos(direction) * speed
    this.vy = Math.sin(direction) * speed

    this.bounce = bounce
    this.friction = friction
    this.gravity = gravity
    this.mass = mass
    this.radius = radius
  }

  accelerate(ax, ay) {
    this.vx += ax
    this.vy += ay
  }

  update() {
    this.vx *= this.friction
    this.vy *= this.friction
    this.vy += this.gravity
    this.x += this.vx
    this.y += this.vy
  }

  angleTo(p2) {
    return Math.atan2(p2.y - this.y, p2.x - this.x)
  }

  distanceTo(p2) {
    const dx = p2.x - this.x
    const dy = p2.y - this.y

    return Math.sqrt(dx * dx + dy * dy)
  }

  gravitateTo(p2) {
    const dx = p2.x - this.x
    const dy = p2.y - this.y
    const distSQ = dx * dx + dy * dy
    const dist = Math.sqrt(distSQ)
    const force = p2.mass / distSQ
    const ax = (dx / dist) * force
    const ay = (dy / dist) * force

    this.vx += ax
    this.vy += ay
  }
}

export default Particle

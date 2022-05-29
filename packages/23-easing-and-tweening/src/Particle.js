class Particle {
  constructor(options = {}) {
    const {
      bounce = -1,
      direction = 0,
      friction = 1,
      gravitations = [],
      gravity = 0,
      mass = 1,
      radius = 0,
      speed = 0,
      springs = [],
      x = 0,
      y = 0,
    } = options

    this.x = x
    this.y = y
    this.vx = Math.cos(direction) * speed
    this.vy = Math.sin(direction) * speed

    this.bounce = bounce
    this.friction = friction
    this.gravitations = gravitations
    this.gravity = gravity
    this.mass = mass
    this.radius = radius
    this.springs = springs
  }

  getSpeed() {
    return Math.sqrt(this.vx * this.vx + this.vy * this.vy)
  }

  setSpeed(speed) {
    const direction = this.getDirection()

    this.vx = Math.cos(direction) * speed
    this.vy = Math.sin(direction) * speed
  }

  getDirection() {
    return Math.atan2(this.vy, this.vx)
  }

  setDirection(angle) {
    const speed = this.getSpeed()

    this.vx = Math.cos(angle) * speed
    this.vy = Math.sin(angle) * speed
  }

  accelerate(ax, ay) {
    this.vx += ax
    this.vy += ay
  }

  angleTo(particle) {
    return Math.atan2(particle.y - this.y, particle.x - this.x)
  }

  distanceTo(particle) {
    const dx = particle.x - this.x
    const dy = particle.y - this.y

    return Math.sqrt(dx * dx + dy * dy)
  }

  gravitateTo(particle) {
    const dx = particle.x - this.x
    const dy = particle.y - this.y
    const distSQ = dx * dx + dy * dy
    const dist = Math.sqrt(distSQ)
    const force = particle.mass / distSQ

    this.vx += (dx / dist) * force
    this.vy += (dy / dist) * force
  }

  addGravitation(particle) {
    this.removeGravitation(particle)
    this.gravitations.push(particle)
  }

  removeGravitation(particle) {
    for (let idx = 0; idx < this.gravitations.length; idx++) {
      if (particle === this.gravitations[idx]) {
        this.gravitations.splice(idx, 2)
        return
      }
    }
  }

  handleGravitations() {
    this.gravitations.forEach((particle) => {
      this.gravitateTo(particle)
    })
  }

  springTo(particle, k, length = 0) {
    const dx = particle.x - this.x
    const dy = particle.y - this.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    const force = (distance - length) * k

    this.vx += (dx / distance) * force
    this.vy += (dy / distance) * force
  }

  addSpring(particle, k, length = 0) {
    this.removeSpring(particle)
    this.springs.push({ particle, k, length })
  }

  removeSpring(particle) {
    for (let idx = 0; idx < this.springs.length; idx++) {
      if (particle === this.springs[0].particle) {
        this.springs.splice(idx, 1)
        return
      }
    }
  }

  handleSprings() {
    this.springs.forEach((spring) => {
      this.springTo(spring.particle, spring.k, spring.length)
    })
  }

  update() {
    this.handleGravitations()
    this.handleSprings()

    this.vx *= this.friction
    this.vy *= this.friction
    this.vy += this.gravity
    this.x += this.vx
    this.y += this.vy
  }
}

export default Particle

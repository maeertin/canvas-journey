class Vector2 {
  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }

  setAngle(angle) {
    const length = this.getLength()
    this.x = Math.cos(angle) * length
    this.y = Math.sin(angle) * length
  }

  getAngle() {
    return Math.atan2(this.y, this.x)
  }

  setLength(length) {
    const angle = this.getAngle()
    this.x = Math.cos(angle) * length
    this.y = Math.sin(angle) * length
  }

  getLength() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  add(vec) {
    return new Vector2(this.x + vec.x, this.y + vec.y)
  }

  subtract(vec) {
    return new Vector2(this.x - vec.x, this.y - vec.y)
  }

  multiply(val) {
    return new Vector2(this.x * val, this.y * val)
  }

  divide(val) {
    return new Vector2(this.x / val, this.y / val)
  }

  addTo(vec) {
    this.x += vec.x
    this.y += vec.y
  }

  subtractFrom(vec) {
    this.x -= vec.x
    this.y -= vec.y
  }

  multiplyBy(val) {
    this.x *= val
    this.y *= val
  }

  divideBy(val) {
    this.x /= val
    this.y /= val
  }
}

export default Vector2

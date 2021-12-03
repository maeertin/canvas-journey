import './style.css'
import * as dat from 'dat.gui'
import Particle from './Particle'
import Vector2 from './Vector2'

/**
 * Base
 */
const gui = new dat.GUI({ closed: true, width: 400 })
const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
const width = (canvas.width = window.innerWidth)
const height = (canvas.height = window.innerHeight)

/**
 * Particle
 */
const ship = new Particle(width / 2, height / 2, 0, 0)
const thrust = new Vector2(0, 0)
let angle = 0
let isThrusting, isTurningLeft, isTurningRight

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      isThrusting = true
      break
    case 'ArrowRight':
      isTurningRight = true
      break
    case 'ArrowLeft':
      isTurningLeft = true
      break
  }
})

document.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      isThrusting = false
      break
    case 'ArrowRight':
      isTurningRight = false
      break
    case 'ArrowLeft':
      isTurningLeft = false
      break
  }
})

function update() {
  context.clearRect(0, 0, width, height)

  if (isTurningLeft) {
    angle -= 0.05
  }
  if (isTurningRight) {
    angle += 0.05
  }

  thrust.setAngle(angle)

  if (isThrusting) {
    thrust.setLength(0.1)
  } else {
    thrust.setLength(0)
  }

  ship.accelerate(thrust)
  ship.update()

  context.save()
  context.translate(ship.position.x, ship.position.y)
  context.rotate(angle)

  context.beginPath()
  context.moveTo(10, 0)
  context.lineTo(-10, -7)
  context.lineTo(-10, 7)
  context.lineTo(10, 0)
  if (isThrusting) {
    context.moveTo(-10, 0)
    context.lineTo(-18, 0)
  }
  context.stroke()

  context.restore()

  // Wrap around canvas
  if (ship.position.x < 0) {
    ship.position.x = width
  } else if (ship.position.x > width) {
    ship.position.x = 0
  } else if (ship.position.y < 0) {
    ship.position.y = height
  } else if (ship.position.y > height) {
    ship.position.y = 0
  }

  requestAnimationFrame(update)
}

update()

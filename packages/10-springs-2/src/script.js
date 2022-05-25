import './style.css'
import { randomRange } from './utils'
import Particle from './Particle'

/**
 * Raf
 */
const fps = 60
const interval = 1000 / fps
let then = Date.now()
let elapsedTime
let now

/**
 * Base
 */
const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
const width = (canvas.width = window.innerWidth)
const height = (canvas.height = window.innerHeight)

const k = 0.01
const separation = 100

/**
 * Particles
 */
const particle1 = new Particle(
  randomRange(0, width),
  randomRange(0, height),
  randomRange(0, 50),
  randomRange(0, Math.PI * 2),
)
particle1.friction = 0.9
particle1.radius = 20

const particle2 = new Particle(
  randomRange(0, width),
  randomRange(0, height),
  randomRange(0, 50),
  randomRange(0, Math.PI * 2),
)
particle2.friction = 0.9
particle2.radius = 20

const particle3 = new Particle(
  randomRange(0, width),
  randomRange(0, height),
  randomRange(0, 50),
  randomRange(0, Math.PI * 2),
)
particle3.friction = 0.9
particle3.radius = 20

update()

function update() {
  requestAnimationFrame(update)

  now = Date.now()
  elapsedTime = now - then
  if (elapsedTime < interval) return
  then = now - (elapsedTime % interval)

  context.clearRect(0, 0, width, height)

  spring(particle1, particle2, separation)
  spring(particle2, particle3, separation)
  spring(particle3, particle1, separation)

  particle1.update()
  particle2.update()
  particle3.update()

  context.beginPath()
  context.arc(particle1.position.x, particle1.position.y, particle1.radius, 0, Math.PI * 2, false)
  context.fill()

  context.beginPath()
  context.arc(particle2.position.x, particle2.position.y, particle2.radius, 0, Math.PI * 2, false)
  context.fill()

  context.beginPath()
  context.arc(particle3.position.x, particle3.position.y, particle3.radius, 0, Math.PI * 2, false)
  context.fill()

  context.beginPath()
  context.moveTo(particle1.position.x, particle1.position.y)
  context.lineTo(particle2.position.x, particle2.position.y)
  context.lineTo(particle3.position.x, particle3.position.y)
  context.lineTo(particle1.position.x, particle1.position.y)
  context.stroke()
}

function spring(p0, p1, sep) {
  const distance = p0.position.subtract(p1.position)
  distance.setLength(distance.getLength() - sep)
  const springForce = distance.multiply(k)

  p1.velocity.addTo(springForce)
  p0.velocity.subtractFrom(springForce)
}

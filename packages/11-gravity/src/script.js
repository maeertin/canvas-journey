import './style.css'
import { randomInt } from './utils'
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

/**
 * Stars
 */
const stars = Array.from(new Array(2), () => {
  return new Particle({
    x: width / 2,
    y: height / 2,
    mass: 20_000,
    radius: 25,
  })
})

/**
 * Planets
 */
const planets = Array.from(new Array(400), () => {
  return new Particle({
    x: width / 2 - randomInt(200, 600),
    y: height / 2,
    radius: randomInt(1, 3),
    direction: -Math.PI / 2,
    speed: randomInt(5, 16),
  })
})

/**
 * Other
 */
const starDistance = 100
const angleSlice = (Math.PI * 2) / stars.length
const forceSpeed = 0.1
let angle = 0

update()

function update() {
  requestAnimationFrame(update)

  now = Date.now()
  elapsedTime = now - then
  if (elapsedTime < interval) return
  then = now - (elapsedTime % interval)

  context.clearRect(0, 0, width, height)

  angle += forceSpeed

  if (stars.length > 1) {
    stars.forEach((star, idx) => {
      star.x = width / 2 + Math.cos(angle + angleSlice * idx) * starDistance
      star.y = height / 2 + Math.sin(angle + angleSlice * idx) * starDistance
    })
  }

  context.beginPath()
  context.rect(0, 0, width, height)
  context.fillStyle = '#000'
  context.fill()

  stars.forEach((star) => {
    context.beginPath()
    context.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
    context.fillStyle = '#fff'
    context.fill()
  })

  planets.forEach((planet) => {
    stars.forEach((star) => {
      planet.gravitateTo(star)
    })
    planet.update()

    context.beginPath()
    context.arc(planet.x, planet.y, planet.radius, 0, Math.PI * 2)
    context.fillStyle = '#fff'
    context.fill()
  })
}

import './style.css'
import * as utils from './utils'
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
 * Config
 */
const starsAmount = 1
const starsSlice = (Math.PI * 2) / starsAmount

const planetsAmount = 400
const planetsSlice = (Math.PI * 2) / planetsAmount

const forceSpeed = 0.1
let angle = 0

/**
 * Stars
 */
const stars = Array.from(new Array(starsAmount), () => {
  return new Particle({
    x: width / 2,
    y: height / 2,
    mass: 20_000,
    radius: 26,
  })
})

/**
 * Planets
 */
const planets = Array.from(new Array(planetsAmount), (_, idx) => {
  const planet = new Particle({
    x: width / 2 + Math.cos(planetsSlice * idx) * utils.randomInt(100, width / 2),
    y: height / 2 + Math.sin(planetsSlice * idx) * utils.randomInt(100, width / 2),
    radius: utils.randomInt(1, 3),
  })

  stars.forEach((star) => {
    planet.addGravitation(star)

    const angleToStar = planet.angleTo(star)
    const speed = 10 + Math.random() * 4
    planet.vx = Math.cos(angleToStar - Math.PI / 4) * speed
    planet.vy = Math.sin(angleToStar - Math.PI / 4) * speed
  })

  return planet
})

update()

function update() {
  requestAnimationFrame(update)

  now = Date.now()
  elapsedTime = now - then
  if (elapsedTime < interval) return
  then = now - (elapsedTime % interval)

  context.clearRect(0, 0, width, height)

  context.beginPath()
  context.rect(0, 0, width, height)
  context.fillStyle = '#000'
  context.fill()

  angle += forceSpeed

  stars.forEach((star, idx) => {
    star.update()

    context.beginPath()
    context.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
    context.fillStyle = '#fff'
    context.fill()

    if (stars.length > 1) {
      star.x = width / 2 + Math.cos(angle + starsSlice * idx) * 100
      star.y = height / 2 + Math.sin(angle + starsSlice * idx) * 100
    }
  })

  planets.forEach((planet) => {
    planet.update()

    context.beginPath()
    context.arc(planet.x, planet.y, planet.radius, 0, Math.PI * 2)
    context.fillStyle = '#fff'
    context.fill()
  })
}

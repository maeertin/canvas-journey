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
 * Particles
 */
const gun = {
  x: 100,
  y: height,
  angle: -Math.PI / 4,
}
const cannonball = new Particle({
  x: gun.x,
  y: gun.y,
  speed: 15,
  direction: gun.angle,
  gravity: 0.2,
  radius: 7,
})
const target = {}
const particles = Array.from(new Array(40), () => {
  return new Particle({
    // x: width / 2,
    // y: height / 2,
    radius: utils.randomInt(1, 3),
    gravity: 0.1,
    // speed: utils.randomInt(5, 10),
    // direction: Math.PI + Math.random() * Math.PI,
  })
})

/**
 * Other
 */
const forceSpeed = 0.1
let isShooting = false
let forceAngle = 0
let rawForce = 0

setTarget()
update()

function setTarget() {
  target.x = utils.randomRange(200, width)
  target.y = height
  target.radius = utils.randomRange(10, 40)
}

document.addEventListener('mousedown', onMouseDown)

document.addEventListener('keydown', (event) => {
  switch (event.keyCode) {
    // spacebar
    case 32: {
      if (!isShooting) {
        shoot()
      }
      break
    }
    default:
      break
  }
})

function shoot() {
  const force = utils.map(rawForce, -1, 1, 2, 20)
  cannonball.x = gun.x + Math.cos(gun.angle) * 40
  cannonball.y = gun.y + Math.sin(gun.angle) * 40
  cannonball.vx = Math.cos(gun.angle) * force
  cannonball.vy = Math.sin(gun.angle) * force

  isShooting = true
}

function update() {
  requestAnimationFrame(update)

  now = Date.now()
  elapsedTime = now - then
  if (elapsedTime < interval) return
  then = now - (elapsedTime % interval)

  if (!isShooting) {
    forceAngle += forceSpeed
  }
  rawForce = Math.sin(forceAngle)

  if (isShooting) {
    particles.forEach((particle) => {
      particle.update()
    })

    cannonball.update()
    checkTarget()
  }

  draw()

  const isExploding = particles.some((particle) => particle.y < height)
  if (cannonball.y > height && !isExploding) {
    isShooting = false
  }
}

function checkTarget() {
  if (utils.circleCollision(target, cannonball)) {
    fireworks()
    setTarget()
  }
}

function fireworks() {
  particles.forEach((particle) => {
    particle.x = target.x
    particle.y = target.y
    particle.vx = Math.cos(Math.PI + Math.random() * Math.PI) * utils.randomInt(2, 5)
    particle.vy = Math.sin(Math.PI + Math.random() * Math.PI) * utils.randomInt(2, 5)
  })
}

function onMouseDown(event) {
  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
  aimGun(event.clientX, event.clientY)
}

function onMouseMove(event) {
  aimGun(event.clientX, event.clientY)
}

function onMouseUp(event) {
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseup', onMouseUp)
  aimGun(event.clientX, event.clientY)
}

function aimGun(mouseX, mouseY) {
  gun.angle = utils.clamp(Math.atan2(mouseY - gun.y, mouseX - gun.x), -Math.PI / 2, -0.3)
}

function draw() {
  context.clearRect(0, 0, width, height)

  context.fillStyle = '#ccc'
  context.fillRect(10, height - 10, 20, -100)

  context.fillStyle = '#666'
  context.fillRect(10, height - 10, 20, utils.map(rawForce, -1, 1, 0, -100))

  context.beginPath()
  context.arc(gun.x, gun.y, 24, 0, Math.PI * 2, false)
  context.fill()

  context.save()
  context.translate(gun.x, gun.y)
  context.rotate(gun.angle)
  context.fillRect(0, -8, 40, 16)
  context.restore()

  context.beginPath()
  context.arc(cannonball.x, cannonball.y, cannonball.radius, 0, Math.PI * 2, false)
  context.fill()

  context.beginPath()
  context.fillStyle = 'red'
  context.arc(target.x, target.y, target.radius, 0, Math.PI * 2, false)
  context.fill()

  particles.forEach((particle) => {
    context.beginPath()
    context.fillStyle = 'red'
    context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2, false)
    context.fill()
  })
}

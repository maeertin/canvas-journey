import './style.css'
import utils from './utils'
import Particle from './Particle'

/**
 * Base
 */
const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
const width = (canvas.width = window.innerWidth)
const height = (canvas.height = window.innerHeight)
const gun = {
  x: 100,
  y: height,
  angle: -Math.PI / 4,
}
const cannonball = new Particle(gun.x, gun.y, 15, gun.angle, 0.2)
cannonball.radius = 7

let canShoot = true

draw()

document.addEventListener('mousedown', onMouseDown)

document.addEventListener('keydown', (event) => {
  switch (event.keyCode) {
    // spacebar
    case 32: {
      if (canShoot) {
        shoot()
      }
      break
    }
  }
})

function shoot() {
  cannonball.position.x = gun.x + Math.cos(gun.angle) * 40
  cannonball.position.y = gun.y + Math.sin(gun.angle) * 40
  cannonball.velocity.setLength(15)
  cannonball.velocity.setAngle(gun.angle)

  canShoot = false
  update()
}

function update() {
  cannonball.update()
  draw()

  if (cannonball.position.y > height) {
    canShoot = true
  } else {
    requestAnimationFrame(update)
  }
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
  draw()
}

function draw() {
  context.clearRect(0, 0, width, height)

  context.beginPath()
  context.arc(gun.x, gun.y, 24, 0, Math.PI * 2, false)
  context.fill()

  context.save()
  context.translate(gun.x, gun.y)
  context.rotate(gun.angle)
  context.fillRect(0, -8, 40, 16)
  context.restore()

  context.beginPath()
  context.arc(
    cannonball.position.x,
    cannonball.position.y,
    cannonball.radius,
    0,
    Math.PI * 2,
    false,
  )
  context.fill()
}

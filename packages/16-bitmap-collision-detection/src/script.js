import './style.css'
import Particle from './Particle'
import * as utils from './utils'

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
const targetCanvas = document.getElementById('target')
const targetContext = targetCanvas.getContext('2d')
const width = (canvas.width = targetCanvas.width = window.innerWidth)
const height = (canvas.height = targetCanvas.height = window.innerHeight)

/**
 * Config
 */
const p = new Particle({
  x: 0,
  y: height / 2,
  speed: 10,
  radius: 4,
})

targetContext.beginPath()
targetContext.arc(width / 2, height / 2, 200, 0, Math.PI * 2)
targetContext.fill()

update()

function update() {
  requestAnimationFrame(update)

  now = Date.now()
  elapsedTime = now - then
  if (elapsedTime < interval) return
  then = now - (elapsedTime % interval)

  context.clearRect(0, 0, width, height)

  p.update()
  context.beginPath()
  context.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
  context.fill()

  const imageData = targetContext.getImageData(p.x, p.y, 1, 1)
  // Check alpha value on pixel data
  if (imageData.data[3] > 0) {
    targetContext.globalCompositeOperation = 'destination-out'
    targetContext.beginPath()
    targetContext.arc(p.x, p.y, 20, 0, Math.PI * 2)
    targetContext.fill()

    resetParticle()
  } else if (p.x > width) {
    resetParticle()
  }

  function resetParticle() {
    p.x = 0
    p.y = height / 2
    p.setDirection(utils.randomRange(-0.1, 0.1))
  }
}

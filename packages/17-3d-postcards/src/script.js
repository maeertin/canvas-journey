import './style.css'
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
const width = (canvas.width = window.innerWidth)
const height = (canvas.height = window.innerHeight)

/**
 * Config
 */
const fl = 300
const numShapes = 100

const shapes = Array.from(new Array(numShapes), () => ({
  x: utils.randomRange(-1_000, 1_000),
  y: utils.randomRange(-1_000, 1_000),
  z: utils.randomRange(0, 10_000),
}))

context.translate(width / 2, height / 2)

update()

function update() {
  requestAnimationFrame(update)

  now = Date.now()
  elapsedTime = now - then
  if (elapsedTime < interval) return
  then = now - (elapsedTime % interval)

  context.clearRect(-width / 2, -height / 2, width, height)

  shapes.forEach((shape) => {
    const perspective = fl / (fl + shape.z)

    context.save()
    context.translate(shape.x * perspective, shape.y * perspective)
    context.scale(perspective, perspective)
    context.fillRect(-100, -100, 200, 200)
    context.restore()

    shape.z += 5
    if (shape.z > 10_000) {
      shape.z = 0
    }
  })
}

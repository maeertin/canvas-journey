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
const points = Array.from(new Array(4), () => ({
  x: utils.randomRange(0, width),
  y: utils.randomRange(0, height),
}))
const [p0, p1, p2, p3] = points
const pFinal = {}
let direction = 0.01
let t = 0

update()

function update() {
  requestAnimationFrame(update)

  now = Date.now()
  elapsedTime = now - then
  if (elapsedTime < interval) return
  then = now - (elapsedTime % interval)

  context.clearRect(0, 0, width, height)

  context.beginPath()
  context.moveTo(p0.x, p0.y)
  context.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y)
  context.stroke()

  utils.cubicBezier(...points, t, pFinal)
  context.beginPath()
  context.arc(pFinal.x, pFinal.y, 10, 0, Math.PI * 2, false)
  context.fill()

  t += direction
  if (t > 1 || t < 0) {
    direction = -direction
  }
}

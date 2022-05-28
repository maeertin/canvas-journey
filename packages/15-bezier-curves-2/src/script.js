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
const numPoints = 10
const points = Array.from(new Array(numPoints), () => ({
  x: Math.random() * width,
  y: Math.random() * height,
}))

update()

function update() {
  requestAnimationFrame(update)

  now = Date.now()
  elapsedTime = now - then
  if (elapsedTime < interval) return
  then = now - (elapsedTime % interval)

  context.clearRect(0, 0, width, height)

  points.forEach((point) => {
    context.beginPath()
    context.arc(point.x, point.y, 3, 0, Math.PI * 2, false)
    context.fill()
  })

  context.beginPath()
  context.strokeStyle = 'lightgray'
  context.moveTo(points[0].x, points[0].y)
  points.forEach((point) => {
    context.lineTo(point.x, point.y)
  })
  context.stroke()

  context.beginPath()
  context.strokeStyle = '#000'
  utils.multicurve(points, context)
  context.stroke()
}

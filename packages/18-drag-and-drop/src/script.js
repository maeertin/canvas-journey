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
const width = (canvas.width = window.innerWidth)
const height = (canvas.height = window.innerHeight)

/**
 * Config
 */
let isDragging = false
const numPoints = 10
const points = Array.from(new Array(numPoints), () => {
  return new Particle({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: 5,
  })
})
const handle = {}

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
    context.fillStyle = isDragging && point === handle.target ? 'red' : 'black'
    context.arc(point.x, point.y, point.radius, 0, Math.PI * 2)
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

document.addEventListener('mousedown', (event) => {
  points.forEach((point) => {
    if (utils.circlePointCollision(event.clientX, event.clientY, point)) {
      handle.target = point
      handle.offsetX = event.clientX - point.x
      handle.offsetY = event.clientY - point.y
      isDragging = true

      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }
  })
})

function handleMouseMove(event) {
  handle.target.x = event.clientX - handle.offsetX
  handle.target.y = event.clientY - handle.offsetY
}

function handleMouseUp() {
  isDragging = false

  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
}

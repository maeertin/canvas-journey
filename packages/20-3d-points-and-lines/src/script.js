import './style.css'

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
const numPoints = 200
const centerZ = 2_000
const radius = 1_000
let controlAngle = 0
let rotationSpeed = 0.01

const points = Array.from(new Array(numPoints), (_, idx) => {
  const angle = 0.2 * idx
  const point = {
    x: Math.cos(angle) * radius,
    y: 2_000 - (4_000 / numPoints) * idx,
    z: centerZ + Math.sin(angle) * radius,
    angle,
  }
  return point
})

context.translate(width / 2, height / 2)

document.addEventListener('mousemove', (event) => {
  rotationSpeed = (event.clientX - width / 2) * 0.00005
})

update()

function update() {
  requestAnimationFrame(update)

  now = Date.now()
  elapsedTime = now - then
  if (elapsedTime < interval) return
  then = now - (elapsedTime % interval)

  context.clearRect(-width / 2, -height / 2, width, height)

  controlAngle += rotationSpeed

  context.beginPath()
  points.forEach((point, idx) => {
    const perspective = fl / (fl + point.z)

    context.save()
    context.scale(perspective, perspective)
    context.translate(point.x, point.y)

    context.scale(Math.sin(point.angle + controlAngle), 1)

    context[idx === 0 ? 'moveTo' : 'lineTo'](0, 0)

    context.restore()

    point.x = Math.cos(point.angle + controlAngle) * radius
    point.z = centerZ + Math.sin(point.angle + controlAngle) * radius
  })
  context.stroke()
}

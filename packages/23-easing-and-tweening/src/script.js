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
const target = {
  x: width,
  y: Math.random() * height,
}
const numPoints = 100
const points = Array.from(new Array(numPoints), () => ({
  x: 0,
  y: 0,
}))
const ease = 0.5
let easing = true

document.addEventListener('mousemove', (event) => {
  target.x = event.clientX
  target.y = event.clientY

  if (!easing) {
    easing = true
    update()
  }
})

update()

function update() {
  if (easing) {
    requestAnimationFrame(update)
  }

  now = Date.now()
  elapsedTime = now - then
  if (elapsedTime < interval) return
  then = now - (elapsedTime % interval)

  context.clearRect(0, 0, width, height)

  context.beginPath()
  context.arc(target.x, target.y, 10, 0, Math.PI * 2)
  context.fill()

  let leader = target
  points.forEach((point) => {
    context.beginPath()
    context.arc(point.x, point.y, 10, 0, Math.PI * 2)
    context.fill()

    easeTo(point, leader, ease)
    leader = point
  })

  easing = !points.every((point) => {
    const dx = target.x - point.x
    const dy = target.y - point.y
    return Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1
  })

  console.log('rafTick') // eslint-disable-line
}

function easeTo(p0, p1, amount) {
  const dx = p1.x - p0.x
  const dy = p1.y - p0.y

  p0.x += dx * amount
  p0.y += dy * amount
}

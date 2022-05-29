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
const position = {
  x: 0,
  y: Math.random() * height,
}
const target = {
  x: width,
  y: Math.random() * height,
}
const ease = 0.1

document.addEventListener('mousemove', (event) => {
  target.x = event.clientX
  target.y = event.clientY
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
  context.arc(position.x, position.y, 10, 0, Math.PI * 2)
  context.fill()

  const dx = target.x - position.x
  const dy = target.y - position.y
  position.x += dx * ease
  position.y += dy * ease

  context.beginPath()
  context.arc(target.x, target.y, 10, 0, Math.PI * 2)
  context.fill()
}

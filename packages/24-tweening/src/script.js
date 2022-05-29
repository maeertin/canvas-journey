/* eslint-disable no-cond-assign */
/* eslint-disable no-return-assign */
/* eslint-disable no-unused-vars */
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
const start = {
  x: 100,
  y: 100,
}
const target = {}
const change = {}
const duration = 1_000
let startTime

drawCircle(start.x, start.y)

document.addEventListener('click', (event) => {
  target.x = event.clientX
  target.y = event.clientY
  change.x = target.x - start.x
  change.y = target.y - start.y
  startTime = new Date()
  update()
})

function update() {
  requestAnimationFrame(update)

  now = Date.now()
  elapsedTime = now - then
  if (elapsedTime < interval) return
  then = now - (elapsedTime % interval)

  context.clearRect(0, 0, width, height)

  const time = new Date() - startTime
  if (time < duration) {
    const x = easeInOutQuad(time, start.x, change.x, duration)
    const y = easeInOutQuad(time, start.y, change.y, duration)
    drawCircle(x, y)
  } else {
    drawCircle(target.x, target.y)
    start.x = target.x
    start.y = target.y
  }
}

// simple linear tweening - no easing
// t: current time, b: beginning value, c: change in value, d: duration
function linearTween(t, b, c, d) {
  return (c * t) / d + b
}

// QUADRATIC EASING: t^2 //

// quadratic easing in - accelerating from zero velocity
// t: current time, b: beginning value, c: change in value, d: duration
// t and d can be in frames or seconds/milliseconds
function easeInQuad(t, b, c, d) {
  return c * (t /= d) * t + b
}

// quadratic easing out - decelerating to zero velocity
function easeOutQuad(t, b, c, d) {
  return -c * (t /= d) * (t - 2) + b
}

// quadratic easing in/out - acceleration until halfway, then deceleration
function easeInOutQuad(t, b, c, d) {
  if ((t /= d / 2) < 1) return (c / 2) * t * t + b
  return (-c / 2) * (--t * (t - 2) - 1) + b
}

function drawCircle(x, y) {
  context.beginPath()
  context.arc(x, y, 20, 0, Math.PI * 2)
  context.fill()
}

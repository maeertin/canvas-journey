/* eslint-disable no-cond-assign */
/* eslint-disable no-return-assign */
/* eslint-disable no-unused-vars */
import './style.css'

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
const ball = {
  x: 100,
  y: 100,
  radius: 20,
  alpha: 1,
}

tween(
  ball,
  {
    x: 500,
    y: 500,
    alpha: 0,
  },
  1000,
  easeInOutQuad,
  render,
  tweenBack,
)

function tweenBack() {
  tween(ball, { x: 100, y: 100, alpha: 1 }, 1_000, easeInOutQuad, render, render)
}

function tween(obj, props, duration, easingFunc, onProgress, onComplete) {
  const starts = {}
  const changes = {}
  const startTime = new Date()

  Object.entries(props).forEach(([key, val]) => {
    starts[key] = obj[key]
    changes[key] = val - starts[key]
  })

  update()

  function update() {
    let time = new Date() - startTime
    if (time < duration) {
      Object.keys(props).forEach((key) => {
        obj[key] = easingFunc(time, starts[key], changes[key], duration)
      })
      requestAnimationFrame(update)
      onProgress?.()
    } else {
      Object.keys(props).forEach((key) => {
        obj[key] = easingFunc(time, starts[key], changes[key], duration)
      })
      time = duration
      onComplete?.()
    }
  }
}

function render() {
  context.clearRect(0, 0, width, height)
  context.globalAlpha = ball.alpha
  context.beginPath()
  context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
  context.fill()
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

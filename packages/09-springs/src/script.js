import './style.css'
import Vector2 from './Vector2'
import Particle from './Particle'

/**
 * Base
 */
const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
const width = (canvas.width = window.innerWidth)
const height = (canvas.height = window.innerHeight)

const fps = 60
const interval = 1000 / fps
let then = Date.now()
let elapsedTime
let now

const springPoint = new Vector2(width / 2, height / 2)
const springLength = 100
const weight = new Particle(
  Math.random() * width,
  Math.random() * height,
  50,
  Math.random() * Math.PI * 2,
  0.5,
)
const k = 0.2

weight.radius = 20
weight.friction = 0.9

document.addEventListener('mousemove', (event) => {
  springPoint.x = event.clientX
  springPoint.y = event.clientY
})

update()

function update() {
  requestAnimationFrame(update)

  now = Date.now()
  elapsedTime = now - then
  if (elapsedTime < interval) return
  then = now - (elapsedTime % interval)

  context.clearRect(0, 0, width, height)

  const distance = springPoint.subtract(weight.position)
  distance.setLength(distance.getLength() - springLength)
  const springForce = distance.multiply(k)

  weight.velocity.addTo(springForce)
  weight.update()

  context.beginPath()
  context.arc(weight.position.x, weight.position.y, weight.radius, 0, Math.PI * 2, false)
  context.fill()

  context.beginPath()
  context.arc(springPoint.x, springPoint.y, 4, 0, Math.PI * 2, false)
  context.fill()

  context.beginPath()
  context.moveTo(weight.position.x, weight.position.y)
  context.lineTo(springPoint.x, springPoint.y)
  context.stroke()
}

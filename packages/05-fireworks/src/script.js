import './style.css'
import * as dat from 'dat.gui'
import Particle from './Particle'
// import Vector2 from './Vector2'

/**
 * Base
 */
const gui = new dat.GUI({ closed: true, width: 400 })
const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
const width = (canvas.width = window.innerWidth)
const height = (canvas.height = window.innerHeight)

/**
 * Particles
 */
const particles = []
for (let idx = 0; idx < 100; idx++) {
  const particle = new Particle(
    width / 2,
    height / 2,
    1 + Math.random() * 8,
    Math.random() * Math.PI * 2,
    0.05,
  )
  particles.push(particle)
}

function update() {
  context.clearRect(0, 0, width, height)

  for (let idx = 0; idx < particles.length; idx++) {
    const particle = particles[idx]

    particle.update()

    context.beginPath()
    context.arc(particle.position.x, particle.position.y, 4, 0, Math.PI * 2)
    context.fill()
  }

  requestAnimationFrame(update)
}

update()

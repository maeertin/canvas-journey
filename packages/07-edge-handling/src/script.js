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
const createParticleSpeed = () => Math.random() * 8 + 5
const createParticleDirection = () => -(Math.PI / 2) + (Math.random() * 0.2 - 0.1)

const particles = []
for (let idx = 0; idx < 100; idx++) {
  const particle = new Particle(
    width / 2,
    height,
    createParticleSpeed(),
    createParticleDirection(),
    0.1,
  )
  particle.radius = 1 + Math.random() * 3
  particles.push(particle)
}

function removeDeadParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    const particle = particles[i]

    if (
      particle.position.x - particle.radius > width ||
      particle.position.x + particle.radius < 0 ||
      particle.position.y - particle.radius > height ||
      particle.position.y + particle.radius < 0
    ) {
      particles.splice(i, 1)
    }
  }
}

function regenParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    const particle = particles[i]

    if (
      particle.position.x - particle.radius > width ||
      particle.position.x + particle.radius < 0 ||
      particle.position.y - particle.radius > height ||
      particle.position.y + particle.radius < 0
    ) {
      particle.position.x = width / 2
      particle.position.y = height
      particle.velocity.setLength(createParticleSpeed())
      particle.velocity.setAngle(createParticleDirection())
    }
  }
}

function update() {
  context.clearRect(0, 0, width, height)

  for (let idx = 0; idx < particles.length; idx++) {
    const particle = particles[idx]

    particle.update()

    context.beginPath()
    context.arc(particle.position.x, particle.position.y, particle.radius, 0, Math.PI * 2)
    context.fill()
  }

  // removeDeadParticles()
  regenParticles()

  requestAnimationFrame(update)
}

update()

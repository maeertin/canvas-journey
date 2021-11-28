import './style.css'
import * as dat from 'dat.gui'
import FKSystem from './fksystem'

const gui = new dat.GUI({ closed: true, width: 400 })
const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

const width = window.innerWidth
const height = window.innerHeight
const centerX = width / 2
const centerY = height / 2
let raf = null

const options = {
  speed: 0.05,
  topLength: 200,
  bottomLength: 180,
  topCenterAngle: Math.PI / 2,
  bottomCenterAngle: 0.9,
  topRotationRange: Math.PI / 4,
  bottomRotationRange: 0.9,
  topPhaseOffset: 0,
  bottomPhaseOffset: -1.5,
}

canvas.width = width
canvas.height = height

const leg0 = new FKSystem({ x: centerX, y: centerY })
leg0.addArm(
  options.topLength,
  options.topCenterAngle,
  options.topRotationRange,
  options.topPhaseOffset,
)
leg0.addArm(
  options.bottomLength,
  options.bottomCenterAngle,
  options.bottomRotationRange,
  options.bottomPhaseOffset,
)

const leg1 = new FKSystem({ x: centerX, y: centerY, phase: Math.PI })
leg1.addArm(
  options.topLength,
  options.topCenterAngle,
  options.topRotationRange,
  options.topPhaseOffset,
)
leg1.addArm(
  options.bottomLength,
  options.bottomCenterAngle,
  options.bottomRotationRange,
  options.bottomPhaseOffset,
)

/**
 * Debug
 */

// speed
gui.add(options, 'speed', 0.01, 0.2, 0.01).onChange((speed) => {
  leg0.speed = speed
  leg1.speed = speed
})

// length
gui.add(options, 'topLength', 20, 300, 20).onChange((length) => {
  leg0.arms[0].length = length
  leg1.arms[0].length = length
})
gui.add(options, 'bottomLength', 20, 300, 20).onChange((length) => {
  leg0.arms[1].length = length
  leg1.arms[1].length = length
})

// centerAngle
gui.add(options, 'topCenterAngle', -3, 3, 0.1).onChange((centerAngle) => {
  leg0.arms[0].centerAngle = centerAngle
  leg1.arms[0].centerAngle = centerAngle
})
gui.add(options, 'bottomCenterAngle', -3, 3, 0.1).onChange((centerAngle) => {
  leg0.arms[1].centerAngle = centerAngle
  leg1.arms[1].centerAngle = centerAngle
})

// rotationRange
gui.add(options, 'topRotationRange', -3, 3, 0.1).onChange((rotationRange) => {
  leg0.arms[0].rotationRange = rotationRange
  leg1.arms[0].rotationRange = rotationRange
})
gui.add(options, 'bottomRotationRange', -3, 3, 0.1).onChange((rotationRange) => {
  leg0.arms[1].rotationRange = rotationRange
  leg1.arms[1].rotationRange = rotationRange
})

// phaseOffset
gui.add(options, 'topPhaseOffset', -3, 3, 0.1).onChange((phaseOffset) => {
  leg0.arms[0].phaseOffset = phaseOffset
  leg1.arms[0].phaseOffset = phaseOffset
})
gui.add(options, 'bottomPhaseOffset', -3, 3, 0.1).onChange((phaseOffset) => {
  leg0.arms[1].phaseOffset = phaseOffset
  leg1.arms[1].phaseOffset = phaseOffset
})

function update() {
  context.clearRect(0, 0, width, height)

  leg0.update()
  leg0.render(context)

  leg1.update()
  leg1.render(context)

  raf = requestAnimationFrame(update)
}

update()

import './style.css'
import * as dat from 'dat.gui'
import ArrowSystem from './ArrowSystem'

/**
 * Base
 */
const gui = new dat.GUI({ closed: true, width: 400 })
const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
const width = (canvas.width = window.innerWidth)
const height = (canvas.height = window.innerHeight)

let mouseX = width / 2
let mouseY = height / 2

const arrowSystem = new ArrowSystem({ x: width / 2, y: height / 2, lerpAmount: 0.1 })
for (let idx = 0; idx < 20; idx++) {
  arrowSystem.addArrow(40)
}

function update() {
  context.clearRect(0, 0, width, height)

  arrowSystem.follow(mouseX, mouseY)
  arrowSystem.render(context)

  requestAnimationFrame(update)
}

document.addEventListener('mousemove', (event) => {
  mouseX = event.clientX
  mouseY = event.clientY
})

update()

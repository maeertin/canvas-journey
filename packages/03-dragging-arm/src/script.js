import './style.css'
import * as dat from 'dat.gui'
import ArmSystem from './ArmSystem'

/**
 * Base
 */
const gui = new dat.GUI({ closed: true, width: 400 })
const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
const width = (canvas.width = window.innerWidth)
const height = (canvas.height = window.innerHeight)

let mouseX = 0
let mouseY = 0

const armSystem = new ArmSystem({ x: width / 2, y: height / 2 })
for (let idx = 0; idx < 40; idx++) {
  armSystem.addArm(20)
}

function update() {
  context.clearRect(0, 0, width, height)

  armSystem.drag(mouseX, mouseY)
  armSystem.render(context)

  raf = requestAnimationFrame(update)
}

document.addEventListener('mousemove', (event) => {
  mouseX = event.clientX
  mouseY = event.clientY
})

update()

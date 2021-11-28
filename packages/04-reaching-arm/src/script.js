import './style.css'
import * as dat from 'dat.gui'
import ArmSystem from './ArmSystem'

const gui = new dat.GUI({ closed: true, width: 400 })
const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

const width = window.innerWidth
const height = window.innerHeight
const centerX = width / 2
const centerY = height / 2
let mouseX = 0
let mouseY = 0
let raf

const options = {}

canvas.width = width
canvas.height = height

const armSystem = new ArmSystem({ x: centerX, y: centerY })
for (let idx = 0; idx < 30; idx++) {
  armSystem.addArm(20)
}

function update() {
  context.clearRect(0, 0, width, height)

  armSystem.reach(mouseX, mouseY)
  armSystem.render(context)

  raf = requestAnimationFrame(update)
}

document.addEventListener('mousemove', (event) => {
  mouseX = event.clientX
  mouseY = event.clientY
})

update()

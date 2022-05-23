import './style.css'
import ArmSystem from './ArmSystem'

const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

const width = window.innerWidth
const height = window.innerHeight
const centerX = width / 2
const centerY = height / 2
let mouseX = 0
let mouseY = 0

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

  requestAnimationFrame(update)
}

document.addEventListener('mousemove', (event) => {
  mouseX = event.clientX
  mouseY = event.clientY
})

update()

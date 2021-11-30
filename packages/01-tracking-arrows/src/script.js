import './style.css'
import * as dat from 'dat.gui'
import ArrowSystem from './ArrowSystem'

const gui = new dat.GUI({ closed: true, width: 400 })
const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

const width = window.innerWidth
const height = window.innerHeight
const centerX = width / 2
const centerY = height / 2
const radius = Math.min(centerX / 2, centerY / 2)
let mouseX = centerX
let mouseY = centerY
let raf

// const options = {
//   arrowCount: 40,
//   clearRect: true,
//   speed: 0.01,
// }

// gui.add(options, 'arrowCount').min(1).max(100).step(1)
// gui.add(options, 'speed').min(0.01).max(0.1).step(0.01)
// gui.add(options, 'clearRect')

canvas.width = width
canvas.height = height

const arrowSystem = new ArrowSystem({ x: centerX, y: centerY, lerpAmount: 0.1 })
for (let idx = 0; idx < 20; idx++) {
  arrowSystem.addArrow(40)
}

function update() {
  context.clearRect(0, 0, width, height)

  arrowSystem.follow(mouseX, mouseY)
  arrowSystem.render(context)

  // console.log(arrow.angle)
  // const slice = (Math.PI * 2) / options.arrowCount

  // for (let i = 0; i < options.arrowCount; i++) {
  //   context.save()

  //   const arrow = arrows[i]
  //   arrow.position.x = centerX + radius * Math.sin(tick) * Math.sin(slice * i + tick)
  //   arrow.position.y = centerY + radius * Math.sin(tick) * Math.cos(slice * i + tick)

  //   context.translate(arrow.position.x, arrow.position.y)
  //   context.rotate(arrow.rotation)

  //   arrow.draw()

  //   context.restore()
  // }

  // tick += options.speed
  raf = requestAnimationFrame(update)
}

document.addEventListener('mousemove', (event) => {
  mouseX = event.clientX
  mouseY = event.clientY
  // for (let i = 0; i < options.arrowCount; i++) {
  //   const mousePosition = { x: event.clientX, y: event.clientY }
  //   const mouseArrowVector = vector2(arrows[i].position, mousePosition)
  //   arrows[i].rotation = Math.atan2(mouseArrowVector.y, mouseArrowVector.x)
  // }
})

update()

import './style.css'
import * as dat from 'dat.gui'

const gui = new dat.GUI({ closed: true, width: 400 })
const guiEl = document.querySelector('.dg.ac')
const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

const width = window.innerWidth
const height = window.innerHeight
const centerX = width / 2
const centerY = height / 2
const radius = Math.min(centerX / 2, centerY / 2)
let raf = null
let tick = 0

const options = {
  arrowCount: 40,
  clearRect: true,
  speed: 0.01,
}

gui.add(options, 'arrowCount').min(1).max(100).step(1)
gui.add(options, 'speed').min(0.01).max(0.1).step(0.01)
gui.add(options, 'clearRect')

canvas.width = width
canvas.height = height

function vector2(p0, p1) {
  return {
    x: p1.x - p0.x,
    y: p1.y - p0.y,
  }
}

class Arrow {
  position = { x: 0, y: 0 }
  rotation = 0

  draw() {
    context.beginPath()
    context.moveTo(-20, 0)
    context.lineTo(20, 0)
    context.lineTo(10, -10)
    context.moveTo(20, 0)
    context.lineTo(10, 10)
    context.stroke()
  }
}

const arrows = []
for (let i = 0; i < options.arrowCount; i++) {
  arrows[i] = new Arrow()
}

function render() {
  if (options.clearRect) {
    context.clearRect(0, 0, width, height)
  }

  const slice = (Math.PI * 2) / options.arrowCount

  for (let i = 0; i < options.arrowCount; i++) {
    context.save()

    const arrow = arrows[i]
    arrow.position.x = centerX + radius * Math.sin(tick) * Math.sin(slice * i + tick)
    arrow.position.y = centerY + radius * Math.sin(tick) * Math.cos(slice * i + tick)

    context.translate(arrow.position.x, arrow.position.y)
    context.rotate(arrow.rotation)

    arrow.draw()

    context.restore()
  }

  tick += options.speed
  raf = requestAnimationFrame(render)
}

document.addEventListener('mousemove', (event) => {
  for (let i = 0; i < options.arrowCount; i++) {
    const mousePosition = { x: event.clientX, y: event.clientY }
    const mouseArrowVector = vector2(arrows[i].position, mousePosition)
    arrows[i].rotation = Math.atan2(mouseArrowVector.y, mouseArrowVector.x)
  }
})

document.addEventListener('click', (event) => {
  if (event.path.includes(guiEl)) return

  if (event.shiftKey) {
    context.clearRect(0, 0, width, height)
    return
  }

  if (raf) {
    cancelAnimationFrame(raf)
    raf = null
  } else {
    render()
  }
})

render()

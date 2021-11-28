import './style.css'
import * as dat from 'dat.gui'
import Arm from './arm'

const gui = new dat.GUI({ closed: true, width: 400 })
const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

const width = window.innerWidth
const height = window.innerHeight
const centerX = width / 2
const centerY = height / 2
let raf

const options = {}

canvas.width = width
canvas.height = height

const arm = new Arm({ x: centerX, y: centerY })

function update() {
  context.clearRect(0, 0, width, height)

  arm.render(context)

  raf = requestAnimationFrame(update)
}

document.addEventListener('mousemove', (event) => {
  arm.drag(event.clientX, event.clientY)
})

update()

import './style.css'

/**
 * Raf
 */
const fps = 60
const interval = 1000 / fps
let then = Date.now()
let elapsedTime
let now

/**
 * Base
 */
const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
const width = (canvas.width = window.innerWidth)
const height = (canvas.height = window.innerHeight)

/**
 * Config
 */
const fl = 300
const centerZ = 1_500
const length = 500
const points = []
let needsUpdate = true

points[0] = { x: -length, y: -length, z: length }
points[1] = { x: length, y: -length, z: length }
points[2] = { x: length, y: -length, z: -length }
points[3] = { x: -length, y: -length, z: -length }
points[4] = { x: -length, y: length, z: length }
points[5] = { x: length, y: length, z: length }
points[6] = { x: length, y: length, z: -length }
points[7] = { x: -length, y: length, z: -length }

context.translate(width / 2, height / 2)

function project() {
  points.forEach((point) => {
    const scale = fl / (fl + point.z + centerZ)
    point.sx = point.x * scale
    point.sy = point.y * scale
  })
}

function drawLine(firstIdx, ...idxs) {
  context.moveTo(points[firstIdx].sx, points[firstIdx].sy)
  idxs.forEach((idx) => {
    context.lineTo(points[idx].sx, points[idx].sy)
  })
}

function translateModel(x, y, z) {
  points.forEach((point) => {
    point.x += x
    point.y += y
    point.z += z
  })
  needsUpdate = true
}

function rotateX(angle) {
  const cos = Math.cos(angle)
  const sin = Math.sin(angle)
  points.forEach((point) => {
    point.y = point.y * cos - point.z * sin
    point.z = point.y * sin + point.z * cos
  })
  needsUpdate = true
}

function rotateY(angle) {
  const cos = Math.cos(angle)
  const sin = Math.sin(angle)
  points.forEach((point) => {
    point.x = point.x * cos - point.z * sin
    point.z = point.x * sin + point.z * cos
  })
  needsUpdate = true
}

function rotateZ(angle) {
  const cos = Math.cos(angle)
  const sin = Math.sin(angle)
  points.forEach((point) => {
    point.x = point.x * cos - point.y * sin
    point.y = point.x * sin + point.y * cos
  })
  needsUpdate = true
}

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowLeft': {
      if (event.shiftKey) {
        rotateZ(0.05)
      } else if (event.altKey) {
        rotateY(0.05)
      } else {
        translateModel(-20, 0, 0)
      }
      break
    }
    case 'ArrowRight': {
      if (event.shiftKey) {
        rotateZ(-0.05)
      } else if (event.altKey) {
        rotateY(-0.05)
      } else {
        translateModel(20, 0, 0)
      }
      break
    }
    case 'ArrowUp': {
      if (event.shiftKey) {
        translateModel(0, 0, -20)
      } else if (event.altKey) {
        rotateX(0.05)
      } else {
        translateModel(0, -20, 0)
      }
      break
    }
    case 'ArrowDown': {
      if (event.shiftKey) {
        translateModel(0, 0, 20)
      } else if (event.altKey) {
        rotateX(-0.05)
      } else {
        translateModel(0, 20, 0)
      }
      break
    }
    default:
      break
  }
})

update()

function update() {
  requestAnimationFrame(update)

  now = Date.now()
  elapsedTime = now - then
  if (elapsedTime < interval) return
  then = now - (elapsedTime % interval)

  if (!needsUpdate) return

  context.clearRect(-width / 2, -height / 2, width, height)

  project()

  context.beginPath()
  drawLine(0, 1, 2, 3, 0)
  drawLine(4, 5, 6, 7, 4)
  drawLine(0, 4)
  drawLine(1, 5)
  drawLine(2, 6)
  drawLine(3, 7)
  context.stroke()

  needsUpdate = false
}

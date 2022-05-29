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
const unsplashImageIds = [
  'p0OlRAAYXLY',
  '1-nx1QR5dTE',
  '0CZwuZhiC84',
  'xFXRUmHhR_w',
  '7bw3REiKLI0',
  'HcqA34-uWo4',
  'FNOYT3NDdE0',
  'ukjjDC6InOE',
  'lYa0zIJndkg',
  'LcTnGQ8SbHA',
]
const fl = 300
const numCards = 7
const centerZ = 1_000
const radius = 1_000
let rotationSpeed = 0.01
let controlAngle = 0

const cards = Array.from(new Array(numCards), (_, idx) => {
  const angle = ((Math.PI * 2) / numCards) * idx
  const card = {
    x: Math.cos(angle) * radius,
    y: 0,
    z: centerZ + Math.sin(angle) * radius,
    angle,
    img: document.createElement('img'),
  }
  card.img.src = `//source.unsplash.com/${unsplashImageIds[idx % unsplashImageIds.length]}/400x400`
  return card
})

context.translate(width / 2, height / 2)

document.addEventListener('mousemove', (event) => {
  rotationSpeed = (event.clientX - width / 2) * 0.00005
})

update()

function update() {
  requestAnimationFrame(update)

  now = Date.now()
  elapsedTime = now - then
  if (elapsedTime < interval) return
  then = now - (elapsedTime % interval)

  context.clearRect(-width / 2, -height / 2, width, height)

  controlAngle += rotationSpeed
  cards.sort(sortByZ)

  cards.forEach((card) => {
    const perspective = fl / (fl + card.z)

    context.save()
    context.scale(perspective, perspective)
    context.translate(card.x, card.y)

    context.translate(-card.img.width / 2, -card.img.height / 2)
    context.drawImage(card.img, 0, 0)

    context.restore()

    card.x = Math.cos(card.angle + controlAngle) * radius
    card.z = centerZ + Math.sin(card.angle + controlAngle) * radius
  })
}

function sortByZ(c0, c1) {
  return c1.z - c0.z
}

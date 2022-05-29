export default function multicurve(points, context) {
  let p0
  let p1
  let midx
  let midy

  context.moveTo(points[0].x, points[0].y)

  for (let idx = 0; idx < points.length - 2; idx++) {
    p0 = points[idx]
    p1 = points[idx + 1]
    midx = (p0.x + p1.x) / 2
    midy = (p0.y + p1.y) / 2
    context.quadraticCurveTo(p0.x, p0.y, midx, midy)
  }
  p0 = points[points.length - 2]
  p1 = points[points.length - 1]
  context.quadraticCurveTo(p0.x, p0.y, p1.x, p1.y)
}

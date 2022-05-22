export default {
  norm: (val, min, max) => (val - min) / (max - min),
  lerp: (norm, min, max) => (max - min) * norm + min,
  map: (val, inMin, inMax, outMin, outMax) => lerp(norm(val, inMin, inMax), outMin, outMax),
  clamp: (val, min, max) => Math.min(Math.max(val, Math.min(min, max)), Math.max(min, max)),
  distance: (p0, p1) => {
    const dx = p1.x - p0.x
    const dy = p1.y - p0.y
    return Math.sqrt(dx * dx + dy * dy)
  },
  distanceXY: (x0, y0, x1, y1) => {
    const dx = x1 - x0
    const dy = y1 - y0
    return Math.sqrt(dx * dx + dy * dy)
  },
  inRange: (val, min, max) => val >= Math.min(min, max) && val <= Math.max(min, max),
  rangeIntersect: (min0, max0, min1, max1) => {
    return (
      Math.max(min0, max0) >= Math.min(min1, max1) && Math.min(min0, max0) <= Math.max(min1, max1)
    )
  },
  circleCollision: (c0, c1) => distance(c0, c1) <= c0.radius + c1.radius,
  circlePointCollision: (x, y, circle) => distanceXY(x, y, circle.x, circle.y) < circle.radius,
  pointInRect: (x, y, rect) => {
    return inRange(x, rect.x, rect.x + rect.width) && inRange(y, rect.y, rect.y + rect.height)
  },
  rectIntersect: (r0, r1) => {
    return (
      rangeIntersect(r0.x, r0.x + r0.width, r1.x, r1.x + r1.width) &&
      rangeIntersect(r0.y, r0.y + r0.height, r1.y, r1.y + r1.height)
    )
  },
}

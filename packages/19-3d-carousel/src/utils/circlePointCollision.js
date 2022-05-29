import distanceXY from './distanceXY'

export default function circlePointCollision(x, y, circle) {
  return distanceXY(x, y, circle.x, circle.y) < circle.radius
}

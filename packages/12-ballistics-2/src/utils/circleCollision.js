import distance from './distance'

export default function circleCollision(c0, c1) {
  return distance(c0, c1) <= c0.radius + c1.radius
}

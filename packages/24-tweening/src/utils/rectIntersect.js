import rangeIntersect from './rangeIntersect'

export default function rectIntersect(r0, r1) {
  return (
    rangeIntersect(r0.x, r0.x + r0.width, r1.x, r1.x + r1.width) &&
    rangeIntersect(r0.y, r0.y + r0.height, r1.y, r1.y + r1.height)
  )
}

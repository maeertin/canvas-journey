export default function rangeIntersect(min0, max0, min1, max1) {
  return (
    Math.max(min0, max0) >= Math.min(min1, max1) && Math.min(min0, max0) <= Math.max(min1, max1)
  )
}

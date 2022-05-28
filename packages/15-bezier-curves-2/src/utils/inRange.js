export default function inRange(val, min, max) {
  return val >= Math.min(min, max) && val <= Math.max(min, max)
}

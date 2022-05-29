export default function roundNearest(value, nearest) {
  return Math.round(value / nearest) * nearest
}

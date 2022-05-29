export default function roudToPlaces(value, places) {
  const multi = 10 ** places
  return Math.round(value * multi) / multi
}

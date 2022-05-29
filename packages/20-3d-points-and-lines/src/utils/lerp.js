export default function lerp(norm, min, max) {
  return (max - min) * norm + min
}

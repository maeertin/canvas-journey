export default {
  norm: (val, min, max) => (val - min) / (max - min),
  lerp: (norm, min, max) => (max - min) * norm + min,
  map: (val, inMin, inMax, outMin, outMax) => lerp(norm(val, inMin, inMax), ourMin, outMax),
  clamp: (val, min, max) => Math.min(Math.max(val, min), max),
}

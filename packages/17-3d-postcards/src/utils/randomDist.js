import randomRange from './randomRange'

export default function randomDist(min, max, iterations) {
  let total = 0
  for (let idx = 0; idx < iterations; idx++) {
    total += randomRange(min, max)
  }
  return total / iterations
}

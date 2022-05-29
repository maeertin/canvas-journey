import lerp from './lerp'
import norm from './norm'

export default function map(val, inMin, inMax, outMin, outMax) {
  return lerp(norm(val, inMin, inMax), outMin, outMax)
}

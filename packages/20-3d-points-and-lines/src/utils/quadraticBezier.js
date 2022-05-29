export default function quadraticBezier(p0, p1, p2, t, pFinal = {}) {
  pFinal.x = (1 - t) ** 2 * p0.x + (1 - t) * 2 * t * p1.x + t * t * p2.x
  pFinal.y = (1 - t) ** 2 * p0.y + (1 - t) * 2 * t * p1.y + t * t * p2.y

  return pFinal
}

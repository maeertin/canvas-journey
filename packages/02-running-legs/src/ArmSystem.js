import Arm from './Arm'

class ArmSystem {
  constructor(options = {}) {
    const { arms = [], lastArm = null, x = 0, y = 0, phase = 0, speed = 0.05 } = options

    this.arms = arms
    this.lastArm = lastArm
    this.x = x
    this.y = y
    this.phase = phase
    this.speed = speed
  }

  addArm(length, centerAngle, rotationRange, phaseOffset) {
    const arm = new Arm({ length, centerAngle, rotationRange, phaseOffset })
    this.arms.push(arm)

    if (this.lastArm) {
      arm.parent = this.lastArm
    }

    this.lastArm = arm
  }

  update() {
    for (let idx = 0; idx < this.arms.length; idx++) {
      const arm = this.arms[idx]
      arm.setPhase(this.phase)

      if (arm.parent) {
        arm.x = arm.parent.getEndX()
        arm.y = arm.parent.getEndY()
      } else {
        arm.x = this.x
        arm.y = this.y
      }
    }

    this.phase += this.speed
  }

  render(context) {
    for (let idx = 0; idx < this.arms.length; idx++) {
      const arm = this.arms[idx]

      arm.render(context)
    }
  }

  rotateArm(idx, angle) {
    this.arms[idx].angle = angle
  }
}

export default ArmSystem

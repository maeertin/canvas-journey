import Arm from './Arm'

class ArmSystem {
  constructor(options = {}) {
    const { x = 0, y = 0 } = options

    this.arms = []
    this.lastArm = null
    this.x = x
    this.y = y
  }

  addArm(length) {
    const arm = new Arm({ x: this.x, y: this.y, length })

    if (this.lastArm) {
      arm.parent = this.lastArm
    }

    this.arms.push(arm)
    this.lastArm = arm
  }

  drag(x, y) {
    this.lastArm.drag(x, y)
  }

  reach(x, y) {
    this.lastArm.drag(x, y)
    this.update()
  }

  update() {
    for (let idx = 0; idx < this.arms.length; idx++) {
      const arm = this.arms[idx]

      if (arm.parent) {
        arm.x = arm.parent.getEndX()
        arm.y = arm.parent.getEndY()
      } else {
        arm.x = this.x
        arm.y = this.y
      }
    }
  }

  render(context) {
    for (let idx = 0; idx < this.arms.length; idx++) {
      this.arms[idx].render(context)
    }
  }
}

export default ArmSystem

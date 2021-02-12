import Phaser from 'phaser'

import { images } from '../../helpers/Constants'

export default class Bullets extends Phaser.Physics.Arcade.Group {
  constructor(world, scene) {
    super(world, scene)

    this.scene = scene

    this.createMultiple({
        frameQuantity: 20,
        key: images.bullet.name,
        active: false,
        visible: false
    })
  }

  enemyCollision(zombie, bullet) {
    Bullets.disable(bullet)

    zombie.takeHit()
  }

  static disable(bullet) {
    bullet.disableBody()
    bullet.active = false
    bullet.visible = false
    bullet.setVelocity(0)
  }

  fireBullet(x, y, directionX, directionY) {
    let bullet = this.getFirstDead(true)

    if (bullet) {
      bullet.enableBody(true)
      bullet.active = true
      bullet.visible = true
      bullet.setPosition(x, y)
      bullet.setScale(0.1)

      this.scene.physics.moveToObject(bullet, { x: directionX, y: directionY }, 300)

      this.scene.time.addEvent({
        delay: 1500,
        callback: () => Bullets.disable(bullet)
      })
    }
  }
}

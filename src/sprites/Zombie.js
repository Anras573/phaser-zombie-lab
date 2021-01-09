import Phaser from 'phaser'

import ZombieConfig from './configs/ZombieConfig'

import { images } from '../helpers/Constants'

export default class Zombie extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, images.zombie.name, ZombieConfig.startingFrame)

    this.scene = scene

    this.createAnimations()

    this.scene.physics.world.enable(this)

    this.scene.add.existing(this)

    this.isHit = false
  }

  createAnimations() {
    if (!this.scene.anims.get(ZombieConfig.animations.walking.name)) {
      this.scene.anims.create({
        key: ZombieConfig.animations.walking.name,
        frames: this.scene.anims.generateFrameNames(images.zombie.name, {
          frames: ZombieConfig.animations.walking.frames
        }),
        frameRate: ZombieConfig.animations.walking.framerate,
        yoyo: true,
        repeat: -1
      })
    }
  }

  takeHit() {
    if (this.isHit)
      return

    this.isHit = true
    this.tint = 0xff0000
    this.setVelocity(0)

    this.scene.time.addEvent({
      delay: 500,
      callback: () => {
        this.disableBody()
        this.active = false
        this.visible = false
      },
      callbackScope: this
    })
  }

  update(playerX, playerY) {
    if (this.isHit)
      return

    if (!this.anims.isPlaying) {
      this.anims.play(ZombieConfig.animations.walking.name)
    }

    this.rotate(playerX, playerY)

    this.scene.physics.moveToObject(this, { x: playerX, y: playerY }, ZombieConfig.velocity)
  }

  rotate(playerX, playerY) {
    var targetAngle = Phaser.Math.Angle.Between(
      this.x,
      this.y,
      playerX,
      playerY)

    var targetAngleDeg = (360 / (2 * Math.PI)) * targetAngle

    if(targetAngleDeg < 0)
      targetAngleDeg += 360

    this.angle = targetAngleDeg
  }
}

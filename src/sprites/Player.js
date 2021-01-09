import Phaser from 'phaser'

import PlayerConfig from './configs/PlayerConfig'

import { images } from '../helpers/Constants'

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, images.player.name, PlayerConfig.startingFrame)

    this.scene = scene

    this.createAnimations()

    this.scene.physics.world.enable(this)

    this.scene.add.existing(this)

    this.hasBeenHit = false;
  }

  createAnimations() {
    if (!this.scene.anims.get(PlayerConfig.animations.walking.name)) {
      this.scene.anims.create({
        key: PlayerConfig.animations.walking.name,
        frames: this.scene.anims.generateFrameNames(images.player.name, {
          frames: PlayerConfig.animations.walking.frames
        }),
        frameRate: PlayerConfig.animations.walking.framerate,
        yoyo: true,
        repeat: -1
      });
    }
  }

  update(cursors, activePointer) {
    this.move(cursors)

    this.rotate(activePointer);
  }

  move(cursors) {
    const velocity = PlayerConfig.velocity
    const isWalking = this.isWalking(cursors)

    this.setVelocity(0)

    if (cursors.up.isDown || cursors.w.isDown) {
        this.setVelocityY(-velocity)
    } else if (cursors.down.isDown || cursors.s.isDown) {
        this.setVelocityY(velocity)
    }

    if (cursors.left.isDown || cursors.a.isDown) {
        this.setVelocityX(-velocity)
    } else if (cursors.right.isDown || cursors.d.isDown) {
        this.setVelocityX(velocity);
    }

    if (isWalking && !this.anims.isPlaying) {
      this.anims.play(PlayerConfig.animations.walking.name)
    } else if (!isWalking && this.anims.isPlaying) {
      this.anims.stop(PlayerConfig.animations.walking.name)
    }
  }

  isWalking(cursors) {
    return cursors.up.isDown
    || cursors.w.isDown
    || cursors.down.isDown
    || cursors.s.isDown
    || cursors.left.isDown
    || cursors.a.isDown
    || cursors.right.isDown
    || cursors.d.isDown
  }

  rotate(activePointer) {
    var targetAngle = Phaser.Math.Angle.Between(
      this.x,
      this.y,
      activePointer.worldX,
      activePointer.worldY);

    var targetAngleDeg = (360 / (2 * Math.PI)) * targetAngle;

    if(targetAngleDeg < 0)
    targetAngleDeg += 360;

    this.angle = targetAngleDeg;
  }

  takeHit() {
    if (!this.hasBeenHit) {
      this.hasBeenHit = true;
      this.tint = 0xff0000;

      this.scene.time.addEvent({
          delay: 1200,
          callback: () => {
              this.hasBeenHit = false;
              this.tint = 0xffffff;
          },
          callbackScope: this
      });
  }
  }
}

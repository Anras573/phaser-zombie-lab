import Phaser from 'phaser'

// For more settings see <https://github.com/photonstorm/phaser/blob/master/src/boot/Config.js>
export default {
  type: Phaser.AUTO,
  parent: 'content',
  width: 800,
  height: 600,
  pixelArt: true,
  roundPixels: true,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: { y: 0 }
    }
  }
}

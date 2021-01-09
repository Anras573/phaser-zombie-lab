import Phaser from 'phaser'

import PathLoaderHelper from '../helpers/PathLoaderHelper'
import { events, images, maps, scenes } from '../helpers/Constants'

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super({ key: scenes.preloader })
  }

  init() {
    this.readyCount = 0;
  }

  preload() {
    this.timedEvent = this.time.delayedCall(2000, this.ready, [], this)

    this.createPreloader()
    this.loadAssets()
  }

  loadAssets() {
    this.load.image(images.bullet.name, PathLoaderHelper.PathToAsset(images.bullet.path))

    this.load.tilemapTiledJSON(maps.laboratory.name, maps.laboratory.path)

    this.load.spritesheet(
      images.tilesheet.name,
      PathLoaderHelper.PathToAsset(images.tilesheet.path),
      { frameWidth: 64, frameHeight: 64 })

    this.load.spritesheet(
      images.player.name,
      PathLoaderHelper.PathToAsset(images.player.path),
      { frameWidth: 40, frameHeight: 48 })

    this.load.spritesheet(
      images.zombie.name,
      PathLoaderHelper.PathToAsset(images.zombie.path),
      { frameWidth: 35, frameHeight: 43 })
  }

  createPreloader() {
    const width = this.cameras.main.width
    const height = this.cameras.main.height

    this.add.image(width / 2, height / 2, images.logo.name)

    var progressBar = this.add.graphics()
    var progressBox = this.add.graphics()

    progressBox.fillStyle(0x222222, 0.8)
    progressBox.fillRect(width / 2 - 160, height / 2 - 30, 320, 50)

    var loadingText = this.make.text({
      x: width / 2,
      y: height /2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    }).setOrigin(0.5, 0.5)

    var percentText = this.make.text({
      x: width / 2,
      y: height /2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    }).setOrigin(0.5, 0.5)

    var assetText = this.make.text({
      x: width / 2,
      y: height /2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    }).setOrigin(0.5, 0.5)

    this.load.on(events.load.progress, function (value) {
      percentText.setText(parseInt(value * 100) + '%')

      progressBar.clear()
      progressBar.fillStyle(0xffffff, 1)
      progressBar.fillRect(width / 2 - 150, height / 2 - 20, 300 * value, 30)
    })

    this.load.on(events.load.fileprogress, function (file) {
      assetText.setText('Loading asset: ' + file.key)
    })

    this.load.on(events.load.complete, function() {
      progressBox.destroy()
      progressBar.destroy()
      assetText.destroy()
      loadingText.destroy()
      percentText.destroy()

      this.ready()
    }.bind(this))
  }

  ready() {
    this.readyCount++

    if (this.readyCount === 1) {
      this.scene.start(scenes.game)
    }
  }
}

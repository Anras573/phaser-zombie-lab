import Phaser from 'phaser'
import { images, scenes } from '../helpers/Constants'
import PathLoaderHelper from '../helpers/PathLoaderHelper'

export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: scenes.boot })
  }

  preload () {
    this.load.image(images.logo.name, PathLoaderHelper.PathToAsset(images.logo.path))
  }

  create() {
    this.scene.start(scenes.preloader)
  }
}

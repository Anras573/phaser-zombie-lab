import Phaser from 'phaser'

import PhaserConfig from './phaser.config'

import { scenes } from './helpers/Constants'

import BootScene from './scenes/BootScene'
import GameScene from './scenes/GameScene'
import PreloaderScene from './scenes/PreloaderScene'

class Game extends Phaser.Game {
  constructor() {
    super(PhaserConfig)

    this.scene.add(scenes.boot, BootScene)
    this.scene.add(scenes.game, GameScene)
    this.scene.add(scenes.preloader, PreloaderScene)

    this.scene.start(scenes.boot)
  }
}

window.onload = function() {
  window.game = new Game()
};

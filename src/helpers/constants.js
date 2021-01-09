import logo from '../../assets/Phaser-Logo-Small.png'
import bullet from '../../assets/images/bullet.png'
import tilesheet from '../../assets/images/tilesheet_complete_2X.png'
import laboratory from '../../assets/maps/laboratory-big.json'
import playerSpritesheet from '../../assets/images/spritesheet_player.png'
import zombieSpritesheet from '../../assets/images/zombie_spritesheet.png'

export const dist = 'dist'
export const zombieSpawnRate = 1000
export const maxNumberOfActiveZombies = 90

export const images = {
  logo: { name: 'logo', path: logo },
  tilesheet: { name: 'tilesheet', path: tilesheet },
  player: { name: 'player', path: playerSpritesheet },
  zombie: { name: 'zombie', path: zombieSpritesheet },
  bullet: { name: 'bullet', path: bullet }
}

export const maps = {
  laboratory: {
    name: 'laboratory',
    path: laboratory,
    tilesetImage: 'tilesheet_complete_2X',
    layers: {
      walls: 'Walls',
      floor: 'Floor'
    },
    objects: {
      player: {
        name: 'Player',
        type: 'StartingPosition'
      },
      spawner: {
        name: 'EnemySpawnPoints',
        type: 'EnemySpawnPoint',
        key: 'Zombie'
      }
    }}
}

export const scenes = {
  boot: 'BootScene',
  game: 'GameScene',
  preloader: 'PreloaderScene'
}

export const events = {
  load: {
    complete: 'complete',
    fileprogress: 'fileprogress',
    progress: 'progress'
  },
  pointer: {
    down: 'pointerdown'
  }
}

export const Constants = {
  dist: dist,
  images: images,
  scenes: scenes,
  events: events,
  maps: maps
};

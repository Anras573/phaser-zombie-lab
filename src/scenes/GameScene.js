import Phaser from 'phaser'

import { events, images, maps, scenes, zombieSpawnRate, maxNumberOfActiveZombies } from '../helpers/Constants'

import Player from '../sprites/Player'
import Zombie from '../sprites/Zombie'
import Bullets from '../sprites/groups/Bullets'

export default class GameScene extends Phaser.Scene {
  constructor () {
    super({ key: scenes.game })
  }

  create () {
    this.createCursorKeys()

    this.createMap()

    this.createPlayer()
    this.createZombieSpawners()

    this.bullets = new Bullets(this.physics.world, this);

    this.setupCollisions()

    this.cameras.main.startFollow(this.player)
  }

  createCursorKeys() {
    this.cursors = this.input.keyboard.createCursorKeys()
    this.cursors.w = this.input.keyboard.addKey('W')
    this.cursors.a = this.input.keyboard.addKey('A')
    this.cursors.s = this.input.keyboard.addKey('S')
    this.cursors.d = this.input.keyboard.addKey('D')
  }

  createMap() {
    const laboratoryMap = maps.laboratory

    this.add.tileSprite(0, 0, 8000, 8000, images.tilesheet.name)

    this.map = this.make.tilemap({ key: laboratoryMap.name })

    this.tiles = this.map.addTilesetImage(laboratoryMap.tilesetImage, images.tilesheet.name)

    this.backgroundLayer = this.map.createStaticLayer(laboratoryMap.layers.floor, this.tiles, 0, 0)
    this.walls = this.map.createStaticLayer(laboratoryMap.layers.walls, this.tiles, 0, 0)
    this.walls.setCollisionByExclusion([-1])
  }

  createPlayer() {
    const playerObject = maps.laboratory.objects.player

    this.map.findObject(playerObject.name, (obj) => {
      if (obj.type === playerObject.type) {
        this.player = new Player(this, obj.x, obj.y)
      }
    })
  }

  createZombieSpawners() {
    const spawnerObject = maps.laboratory.objects.spawner

    let spawnPoints = this.map.createFromObjects(spawnerObject.name, spawnerObject.type, { key: spawnerObject.key }, this)
    this.zombies = []

    spawnPoints.forEach((spawn) => {
      let zombie = new Zombie(this, spawn.x, spawn.y)

      this.zombies.push(zombie)

      this.time.addEvent({
        delay: zombieSpawnRate,
        callback: () => {
          if (this.zombies.length < maxNumberOfActiveZombies) {
            let zombie = new Zombie(this, spawn.x, spawn.y)

            this.zombies.push(zombie)
          }
        },
        loop: true
      })
    });
  }

  setupCollisions() {
    this.physics.add.collider(this.player, this.walls)
    this.physics.add.collider(this.zombies, this.walls)

    this.physics.add.overlap(this.player, this.zombies, this.player.takeHit.bind(this.player));
    this.physics.add.overlap(this.bullets, this.zombies, this.bullets.enemyCollision);
  }

  update() {
    const cursors = this.cursors
    const activePointer = this.input.activePointer

    this.player.update(cursors, activePointer)

    this.zombies.forEach((zombie) => {
      zombie.update(this.player.x, this.player.y)
    })

    this.input.on(events.pointer.down, () => {
      this.bullets.fireBullet(this.player.x, this.player.y, activePointer.worldX, activePointer.worldY);
    }, this);

    const shouldShoot = Phaser.Input.Keyboard.JustDown(this.cursors.space)

    if (shouldShoot) {
      this.bullets.fireBullet(this.player.x, this.player.y, activePointer.worldX, activePointer.worldY);
    }
  }
}

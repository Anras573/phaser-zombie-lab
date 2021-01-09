import Phaser from 'phaser'
import Zombie from '../Zombie';

export default class Zombies extends Phaser.Physics.Arcade.Group {
  constructor(world, scene, zombieArray) {
    super(world, scene)

    zombieArray.forEach((zombie) => {
      const sprite = new Zombie(scene, zombie.x, zombie.y);

      this.add(sprite);

      zombie.destroy();
  });
  }
}

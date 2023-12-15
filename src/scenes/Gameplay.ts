import Phaser from "phaser";

export default class Gameplay extends Phaser.Scene {
  logo: Phaser.Physics.Arcade.Image | null = null;

  constructor() {
    super();
  }

  preload() {
    this.load.setBaseURL("https://labs.phaser.io");

    this.load.image("sky", "assets/skies/space3.png");
    this.load.image("logo", "assets/sprites/phaser3-logo.png");
    // this.load.image("red", "assets/particles/red.png");
  }

  create() {
    this.add.image(400, 300, "sky");

    this.logo = this.physics.add.image(400, 100, "logo");

    this.logo.setBounce(1, 1);
    this.logo.setCollideWorldBounds(true);
  }

  update() {
    if (this.logo) {
      const pos = new Phaser.Math.Vector2(this.logo.x, this.logo.y);
      const dir = pos.subtract(this.input.mousePointer).negate();

      this.logo.setVelocity(dir.x, dir.y);
    }
  }
}

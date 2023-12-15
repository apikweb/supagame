import Phaser from "phaser";

const world = {
  width: 2000,
  height: 2000,
};

export default class Gameplay extends Phaser.Scene {
  player: Phaser.Physics.Arcade.Image | null = null;
  cam: Phaser.Cameras.Scene2D.Camera | null = null;
  text: Phaser.GameObjects.Text | null = null;

  constructor() {
    super();
  }

  preload() {
    this.load.image("arrow", "images/arrow.png");
    this.load.image("grid", "images/grid.png");
  }

  create() {
    const grid = this.add.tileSprite(0, 0, world.width, world.height, "grid");
    grid.setOrigin(0, 0);
    const rect = this.add.rectangle(
      0,
      0,
      world.width,
      world.height,
      0x3498eb,
      0.7,
    );
    rect.setOrigin(0, 0);
    this.physics.world.setBounds(0, 0, world.width, world.height);

    this.cam = this.cameras.main;

    this.player = this.physics.add.image(400, 100, "arrow");
    this.player.setOrigin(0.5);
    if (this.player.body) {
      this.player.setCircle(
        50,
        this.player.body.halfWidth - 50,
        this.player.body.halfHeight - 50,
      );
    }
    this.player.setScale(0.7);
    this.player.setBounce(0);
    this.player.setCollideWorldBounds(true);

    this.cam.startFollow(this.player);

    this.text = this.add.text(10, 10, `x: 0, y: 0`);
  }

  update() {
    if (this.player) {
      const center = new Phaser.Math.Vector2(
        this.cam?.centerX,
        this.cam?.centerY,
      );
      const mouse = new Phaser.Math.Vector2(this.input.x, this.input.y);
      // Calculate the angle between the two vectors in radians
      const angle = Phaser.Math.Angle.Between(
        center.x,
        center.y,
        mouse.x,
        mouse.y,
      );
      const dir = center.subtract(mouse).negate().normalize();

      if (this.text) {
        this.text.text = `x: ${dir.x.toFixed(2)}, y: ${dir.y.toFixed(2)}`;
      }

      const speed = 200;

      this.player.setVelocity(dir.x * speed, dir.y * speed);
      this.player.setRotation(angle + Math.PI / 2);
    }
  }
}

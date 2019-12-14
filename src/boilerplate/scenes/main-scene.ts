export class MainScene extends Phaser.Scene {
  private player: Phaser.Physics.Arcade.Sprite;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private astroids: Phaser.Physics.Arcade.Group;
  private shots: Phaser.Physics.Arcade.Group;
  private isFiring = false;

  constructor() {
    super({
      key: "MainScene"
    });
  }

  preload(): void {
    // Load & define spries
    this.load.image("astroid", "../assets/astroid.png");
    this.load.image("bullet", "../assets/bullet.png");
    this.load.image("spaceship", "../assets/spaceship.png");
  }

  create(): void {
    // empty game object groups, used for easier collision
    this.astroids = this.physics.add.group();
    this.shots = this.physics.add.group();

    // Initialize Player and Astroids

    // Initialize Keyboard

    // Add Collision
  }

  update(): void {
    // Add keyboard control
  }
}

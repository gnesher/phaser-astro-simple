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
    this.player = this.physics.add.sprite(100, 450, 'spaceship');

    for (let i = 0; i < 4; i++) {
      const astroid = this.physics.add.sprite(100 * i, 100 * i, 'astroid');
      this.astroids.add(astroid);
    }

    // Initialize Keyboard
    this.cursors = this.input.keyboard.createCursorKeys();

    // Add Collision
    this.physics.add.overlap(this.player, this.astroids, () => {
      this.scene.restart();
    }, null, this);

    this.physics.add.overlap(this.astroids, this.shots, (astroidObj, shotObj) => {
      astroidObj.destroy();
      shotObj.destroy();
    });



  }

  update(): void {
    // Add keyboard control
    if (this.cursors.left.isDown) {
      this.player.rotation -= 0.08;
    }

    if (this.cursors.right.isDown) {
      this.player.rotation += 0.08;
    }

    if (this.cursors.up.isDown) {
      this.physics.velocityFromRotation(this.player.rotation, 200, this.player.body.velocity);
    }

    if (this.cursors.space.isDown && !this.isFiring) {
      const shot = this.physics.add.sprite(this.player.x, this.player.y, 'bullet');
      this.shots.add(shot);
      this.physics.velocityFromRotation(this.player.rotation, 400, shot.body.velocity);
      this.isFiring = true;
    }

    if (this.cursors.space.isUp) {
      this.isFiring = false;
    }
  }
}

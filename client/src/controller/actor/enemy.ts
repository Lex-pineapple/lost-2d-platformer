class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.getBody().setCollideWorldBounds(true);
    this.getBody().setSize(32, 32);
    this.getBody().setOffset(0, -5);
    this.setImmovable();
    this.initAnimation();
  }

  private initAnimation() {
    this.scene.anims.create({
      key: 'hover',
      frames: this.scene.anims.generateFrameNames('a-enemy-hover', {
        prefix: 'bee-hover-',
        suffix: '.png',
        start: 1,
        end: 4,
      }),
      frameRate: 3,
      repeat: -1,
    });
    this.anims.play('hover', true);
  }

  protected getBody(): Phaser.Physics.Arcade.Body {
    return this.body as Phaser.Physics.Arcade.Body;
  }
}

export default Enemy;

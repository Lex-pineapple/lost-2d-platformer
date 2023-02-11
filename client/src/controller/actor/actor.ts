import * as Phaser from 'phaser';

class Actor extends Phaser.Physics.Arcade.Sprite {
  protected hp = 3;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
    super(scene, x, y, texture, frame);

    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.getBody().setCollideWorldBounds(true);
    this.getBody().setBounceY(0);
  }

  public getDamage(value?: number): void {
    this.getBody().velocity.x = 200 * -this.scaleX;
    
    this.scene.tweens.add({
      targets: this,
      duration: 50,
      repeat: 3,
      yoyo: true,
      alpha: 0.5,
      onStart: () => {
        if (value) {
          this.hp -= value;
        }
      },
      onComplete: () => {
        this.setAlpha(1);
      },
    });
  }

  public getHPValue(): number {
    return this.hp;
  }

  protected checkFlip(): void {
    if (this.body.velocity.x < 0) {
      this.scaleX = -1;
    } else if (this.body.velocity.x > 0) {
      this.scaleX = 1;
    }
  }

  protected checkFlipY(): void {
    if (this.body.velocity.y < 0) {
      this.scaleX = -1;
    } else {
      this.scaleX = 1;
    }
  }

  protected getBody(): Phaser.Physics.Arcade.Body {
    return this.body as Phaser.Physics.Arcade.Body;
  }
}

export default Actor;

import * as Phaser from 'phaser';

class Actor extends Phaser.Physics.Arcade.Sprite {
  protected hp = 100;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
    super(scene, x, y, texture, frame);

    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.getBody().setCollideWorldBounds(true);
    this.getBody().setBounceY(0.1);
  }

  public getDamage(value?: number): void {
    this.scene.tweens.add({
      targets: this,
      duration: 100,
      repeat: 3,
      yoyo: true,
      alpha: 0.5,
      onStart: () => {
        if (value) {
          this.hp = this.hp - value;
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
    } else {
      this.scaleX = 1;
    }
  }

  protected getBody(): Phaser.Physics.Arcade.Body {
    return <Phaser.Physics.Arcade.Body>this.body;
  }
}

export default Actor;
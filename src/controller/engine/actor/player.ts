import * as Phaser from 'phaser';
import Actor from './actor';

class Player extends Actor {
  private keyD: Phaser.Input.Keyboard.Key;
  private keyA: Phaser.Input.Keyboard.Key;
  private keySpace: Phaser.Input.Keyboard.Key;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'cat');
    this.keyA = this.scene.input.keyboard.addKey('A');
    this.keyD = this.scene.input.keyboard.addKey('D');
    this.keySpace = this.scene.input.keyboard.addKey('SPACE');

    this.getBody().setSize(48, 48);
    this.getBody().setOffset(8, 0);
    this.initAnimations();
  }

  private initAnimations(): void {   
    console.log( this.scene.anims.generateFrameNames('a-cat-idle'));

    this.scene.anims.create({
      key: 'run',
      frames: this.scene.anims.generateFrameNames('a-cat', {
        prefix: 'cat-run-',
        suffix: '.png',
        start: 1,
        end: 5,
      }),
      frameRate: 15,
      repeat: -1,
    });
    this.scene.anims.create({
      key: 'idle',
      frames: this.scene.anims.generateFrameNames('a-cat-idle', {
        prefix: 'cat-idle',
        suffix: '.png',
        start: 1,
        end: 4,
      }),
      frameRate: 5,
      repeat: -1,
    });
  }

  update(): void {
    this.getBody().setVelocity(0);

    if (this.keyA?.isDown) {
      this.body.velocity.x = -160;
      this.checkFlip();
      this.getBody().setOffset(48, 0);
      this.anims.play('run', true);
    }

    if (this.keyD?.isDown) {
      this.body.velocity.x = 160;
      this.checkFlip();
      this.getBody().setOffset(15, 0);
      this.anims.play('run', true);
    }

    // if (this.keySpace?.isDown) {
    //   this.body.velocity.y = -110;
    // }

    if (!this.keyD?.isDown && !this.keyA?.isDown) {
      this.anims.play('idle', true);
    }
  }
}

export default Player;
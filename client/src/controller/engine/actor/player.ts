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
    this.scene.anims.create({
      key: 'run',
      frames: this.scene.anims.generateFrameNames('a-cat', {
        prefix: 'cat-run-',
        suffix: '.png',
        start: 1,
        end: 5,
      }),
      frameRate: 12,
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
    this.scene.anims.create({
      key: 'jump',
      frames: this.scene.anims.generateFrameNames('a-cat-jump', {
        prefix: 'cat-jump-',
        suffix: '.png',
        start: 1,
        end: 4,
      }),
    });
  }

  update(): void {
    // Affects fall physics!
    this.getBody().velocity.x = 0;

    // Run left on A press
    if (this.keyA?.isDown) {
      if (!this.keySpace?.isDown) {
        this.anims.play('run', true);
        this.body.velocity.x = -160;
      }
      this.body.velocity.x = -200;

      this.checkFlip();
      this.getBody().setOffset(48, 0);
    }

    // Run right on D press
    if (this.keyD?.isDown) {
      if (!this.keySpace?.isDown) {
        this.anims.play('run', true);
        this.body.velocity.x = 160;
      }
      this.body.velocity.x = 200;
      this.checkFlip();
      this.getBody().setOffset(15, 0);
    }

    // Jump on space press
    // Set frames based on velocity!!
    if (this.keySpace?.isDown) {
      console.log(this.getBody().velocity);
      if (this.getBody().onFloor()) {
        this.body.velocity.y = -800;
      }
      // this.anims.play('jump', true);
      // if (this.keyD?.isDown) {

      //   this.body.velocity.x = 1000;
      // }
      // if (this.keyA?.isDown) {
      //   this.body.velocity.x = -600;
      // }
      // this.anims.stop();
      // this.body.gravity.y = -600;
    }

    // Idle animation
    if (!this.keyD?.isDown && !this.keyA?.isDown && !this.keySpace?.isDown) {
      this.anims.play('idle', true);
    }
  }
}

export default Player;

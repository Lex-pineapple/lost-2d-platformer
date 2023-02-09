import * as Phaser from 'phaser';
import Actor from './actor';
import PauseManager from '../helpers/pauseManager';

class Player extends Actor {
  private keyD: Phaser.Input.Keyboard.Key;

  private keyA: Phaser.Input.Keyboard.Key;

  private keyS: Phaser.Input.Keyboard.Key;

  private keySpace: Phaser.Input.Keyboard.Key;

  private keyESC: Phaser.Input.Keyboard.Key;

  onWall: boolean;

  canJump: boolean;

  jumped: boolean;

  jumpVelocity: number;

  runVelocity: number;

  // private _PauseManager: PauseManager;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'cat');
    this.keyA = this.scene.input.keyboard.addKey('A');
    this.keyD = this.scene.input.keyboard.addKey('D');
    this.keyS = this.scene.input.keyboard.addKey('S');
    this.keySpace = this.scene.input.keyboard.addKey('SPACE');
    this.onWall = false;
    this.canJump = true;
    this.jumped = false;
    this.jumpVelocity = 600;
    this.runVelocity = 600;
    this.keyESC = this.scene.input.keyboard.addKey('ESC');

    // this._PauseManager = new PauseManager(scene);

    this.getBody().setSize(48, 48);
    this.getBody().setGravityY(1400);
    // this.getBody().setOffset(8, 0);
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
        end: 3,
      }),
      frameRate: 5,
    });
  }

  private checkWallCollision() {
    if (this.body.blocked.right && !this.body.blocked.down) this.onWall = true;
    else if (this.body.blocked.left && !this.body.blocked.down) this.onWall = true;
  }

  private handleJump() {
    if ((this.canJump && this.body.blocked.down) || this.onWall) {
      this.body.velocity.y = -this.jumpVelocity;
      if (this.onWall) {
        // this.body.velocity.x = this.jumpVelocity * this.scaleX;
      }
      this.jumped = true;
      this.canJump = false;
      this.onWall = false;
    }

    // if (this.getBody().onFloor()) {
    //   this.anims.play('jump');
    // }
  }

  update(): void {
    // Affects fall physics!
    this.getBody().velocity.x = 0;
    if (this.body.blocked.down) {
      this.canJump = true;
      this.onWall = false;
      if (this.onWall) this.jumped = false;
    }
    this.checkWallCollision();
    if (this.onWall) {
      this.setTexture('cat-wall-slide');
      this.getBody().setGravityY(600);
      this.getBody().setVelocityY(0);
      if (this.body.blocked.left) {
        this.angle = 90;
      } else if (this.body.blocked.right) {
        this.angle = -90;
      }
      if (this.keyS.isDown) {
        this.body.velocity.y = 600;
      }
    } else {
      this.angle = 0;
      this.getBody().setGravityY(1400);
    }
    if (!this.onWall) {
      if (this.body.velocity.y > 100) {
        this.anims.stop();
        this.setTexture('cat-jump-3');
      }
      if (this.body.velocity.y < -100) {
        this.anims.stop();
        this.setTexture('cat-jump-1');
      }
    }

    // Run left on A press
    if (this.keyA?.isDown && !this.onWall) {
      console.log(this.body.velocity.y);
      if (!this.keySpace?.isDown && !this.body.velocity.y) {
        this.anims.play('run', true);
      }
      this.body.velocity.x = -600;
      this.checkFlip();
      this.getBody().setOffset(48, 0);
    }

    // Run right on D press
    if (this.keyD?.isDown && !this.onWall) {
      console.log();

      if (!this.keySpace?.isDown && !this.body.velocity.y) {
        this.anims.play('run', true);
      }
      this.body.velocity.x = 600;
      this.checkFlip();
      this.getBody().setOffset(0, 0);
    }

    // Jump on space press
    // Set frames based on velocity!!
    if (this.keySpace?.isDown) {
      this.handleJump();
    }

    // Idle animation
    // eslint-disable-next-line
    if (!this.keyD?.isDown && !this.keyA?.isDown && !this.keySpace?.isDown && !this.onWall && this.body.blocked.down) {
      this.anims.play('idle', true);
    }

    if (this.keyESC.isDown) {
      // this._PauseManager.switchPause();
      PauseManager.switchPause(this.scene);
    }
  }
}

export default Player;

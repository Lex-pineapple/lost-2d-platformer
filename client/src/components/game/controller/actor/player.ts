import * as Phaser from 'phaser';
import Actor from './actor';
import DialogueModal from './dialogueModal';

class Player extends Actor {
  private keyD: Phaser.Input.Keyboard.Key;

  private keyA: Phaser.Input.Keyboard.Key;

  private keyS: Phaser.Input.Keyboard.Key;

  private keyF: Phaser.Input.Keyboard.Key;

  private keySpace: Phaser.Input.Keyboard.Key;

  onWall: boolean;

  canJump: boolean;

  jumped: boolean;

  jumpVelocity: number;

  runVelocity: number;

  overlap: boolean;

  overlapParams!: { name: string; scene: string };

  dialogueModal: DialogueModal;

  enemyCollide: boolean;

  collisionEnd: boolean;

  hasKey: boolean;

  onPlatform: boolean;

  collided: boolean;

  lockedTo: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | null;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'cat');
    this.keyA = this.scene.input.keyboard.addKey('A');
    this.keyD = this.scene.input.keyboard.addKey('D');
    this.keyS = this.scene.input.keyboard.addKey('S');
    this.keyF = this.scene.input.keyboard.addKey('F');

    this.keySpace = this.scene.input.keyboard.addKey('SPACE');
    this.onWall = false;
    this.canJump = true;
    this.jumped = false;
    this.jumpVelocity = 600;
    this.runVelocity = 600;
    this.overlap = false;
    this.dialogueModal = new DialogueModal(this.scene, {});
    this.enemyCollide = false;
    this.collisionEnd = false;
    this.hasKey = true;
    this.onPlatform = false;
    this.lockedTo = null;
    this.collided = false;

    this.getBody().setSize(48, 48);
    this.getBody().setGravityY(1400);
    this.setDepth(1);
    this.getBody().maxVelocity.setTo(600, 600);
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
      if (this.onWall) {
        if (!this.keyD?.isDown && !this.keyA?.isDown) {
          this.scaleX *= -1;
          if (this.scaleX < 0) {
            this.getBody().setOffset(48, 0);
          } else {
          this.getBody().setOffset(0, 0);
        }
        this.body.velocity.x = 600 * this.scaleX;
        this.body.velocity.y = -this.jumpVelocity;
        }
      } else {
        this.body.velocity.y = -this.jumpVelocity;
      }
      this.jumped = true;
      this.canJump = false;
      this.onWall = false;
    }
    // if (!this.keyD?.isDown && !this.keyA?.isDown) {
    // }

    // if (this.getBody().onFloor()) {
    //   this.anims.play('jump');
    // }
  }

  setOverlap(variab: boolean) {
    this.overlap = variab;
  }

  getOverlapSprite(spriteName: string, sceneName: string) {
    this.overlapParams = {
      name: spriteName,
      scene: sceneName,
    };
  }

  diableKeys() {
    this.keyA.enabled = false;
    this.keyD.enabled = false;
    this.keySpace.enabled = false;
    this.keyS.enabled = false;
  }

  enableRun() {
    this.anims.play('run', true);
  }

  disableRun() {
    this.body.velocity.x = 0;
    this.anims.stop();
  }

  enableIdle() {
    this.body.velocity.x = 0;
    this.anims.play('idle', true);
  }

  enableKeys() {
    this.keyA.enabled = true;
    this.keyD.enabled = true;
    this.keySpace.enabled = true;
    this.keyS.enabled = true;
  }

  update(): void {
    // Check if player collides with wall
    this.checkWallCollision();

    // Reset velocity to prevent gliding
    // this.getBody().velocity.x = 0;

    if (!this.body.blocked.none) {
      this.getBody().velocity.x = 0;
    }
    // Check if the player is on ground
    if (this.body.blocked.down) {
      this.canJump = true;
      this.onWall = false;
      if (this.onWall) this.jumped = false;
    }

    // Run right on D press
    if (this.keyD?.isDown && !this.onWall) {
      if (!this.keySpace?.isDown && !this.body.velocity.y) {
        this.anims.play('run', true);
      }
      this.body.velocity.x = 600;
      this.checkFlip();
      this.getBody().setOffset(0, 0);
    }

    // Run left on A press
    if (this.keyA?.isDown && !this.onWall) {
      if (!this.keySpace?.isDown && !this.body.velocity.y) {
        this.anims.play('run', true);
      }
      this.body.velocity.x = -600;
      this.checkFlip();
      this.getBody().setOffset(48, 0);
    }

    // Jump on SPACE press
    if (Phaser.Input.Keyboard.JustDown(this.keySpace)) {
      this.handleJump();
    }

    // console.log(this.x, this.y);
    if (this.lockedTo) {
      if (this.body.right < this.lockedTo?.body.x || this.body.x > this.lockedTo?.body.right) {
        this.lockedTo = null;
        this.onPlatform = false;
      } else {
        this.x += this.lockedTo.body.deltaX();
        this.y += this.lockedTo.body.deltaY();
      }
    }
    if (this.enemyCollide && !this.collisionEnd) {
      this.getDamage(1);
      this.collisionEnd = true;
    }

    if (this.body.embedded) {
      this.body.touching.none = false;
    }

    if (this.body.touching.none && !this.body.wasTouching.none) {
      this.setOverlap(false);
      this.enemyCollide = false;
      this.collisionEnd = false;
      this.onPlatform = false;
      this.collided = false;
    }
    // Affects fall physics!

    if (this.onWall) {
      this.setTexture('cat-wall-slide');
      this.getBody().setGravityY(0);
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
    if (!this.onWall && !this.onPlatform) {
      if (this.body.velocity.y > 100) {
        this.anims.stop();
        this.setTexture('cat-jump-3');
      }
      if (this.body.velocity.y < -100) {
        this.anims.stop();
        this.setTexture('cat-jump-1');
      }
    }

    if (Phaser.Input.Keyboard.JustDown(this.keyF) && this.overlap) {
      if (this.overlapParams) {
        this.diableKeys();
        this.dialogueModal.displayNPCdialogue(this.overlapParams.name, this.overlapParams.scene);
      }
      if (!this.dialogueModal.created) {
        this.enableKeys();
      }
    }

    // Idle animation
    if (
      !this.keyD?.isDown
      && !this.keyA?.isDown
      && !this.keySpace?.isDown
      && !this.onWall
      && this.body.blocked.down
    ) {
      this.anims.play('idle', true);
    }
  }
}

export default Player;
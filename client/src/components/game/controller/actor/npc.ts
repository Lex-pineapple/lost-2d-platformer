import DialogueModal from './dialogueModal';
import randomGenerator from '../helpers/randomGenerator';
import { INPCDialogData } from '../../../../types/interfaces';

class NPC extends Phaser.Physics.Arcade.Sprite {
  name: string;

  scene: Phaser.Scene;

  sceneName: string;

  dialogueModal!: DialogueModal;

  mainDialogFinished: boolean;

  idleDialogFinished: boolean;

  mainDialogCounter: number;

  idleDialogCounter: number;

  constructor(
    scene: Phaser.Scene,
    name: string,
    x: number,
    y: number,
    texture: string,
    sceneName: string,
    type: string,
    frame?: string | number
  ) {
    super(scene, x, y, texture, frame);
    this.scene = scene;
    this.name = name;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.getBody().setCollideWorldBounds(true);
    this.createAnimation();
    this.flipX = true;
    this.mainDialogFinished = false;
    this.idleDialogFinished = true;
    this.mainDialogCounter = 0;
    this.idleDialogCounter = 0;
    this.sceneName = sceneName;
    this.dialogueModal = new DialogueModal(this.scene, {});
    this.getBody().setSize(128, 64);
    this.initAnimation(type);
    // this.getBody().setOffset(11, 9);
    // .setOrigin(0.5, 1)
    // .setDepth(2);
    // this.body.setCollideWorldBounds(true);
    // .sprite(x, y, name)
    // .setCollideWorldBounds(true)
  }

  private initAnimation(type: string) {
    this.anims.play(type, true);
  }

  flip() {
    this.scaleX = -1;
    this.getBody().setOffset(48, 0);
  }

  private createAnimation() {
    this.scene.anims.create({
      key: 'sit',
      frames: this.scene.anims.generateFrameNames('a-npc1-sit', {
        prefix: 'npc1-sit-frames-',
        suffix: '.png',
        start: 1,
        end: 4,
      }),
      frameRate: 3,
      repeat: -1,
    });
    this.scene.anims.create({
      key: 'sleep',
      frames: this.scene.anims.generateFrameNames('a-npc-sleep', {
        prefix: 'cat-sleep-frames-',
        suffix: '.png',
        start: 1,
        end: 2,
      }),
      frameRate: 1,
      repeat: -1,
    });
    this.scene.anims.create({
      key: 'lie',
      frames: this.scene.anims.generateFrameNames('a-npc-lie', {
        prefix: 'cat-lie-frames-',
        suffix: '.png',
        start: 1,
        end: 3,
      }),
      frameRate: 2,
      repeat: -1,
    });
    this.scene.anims.create({
      key: 'black-cat-sit',
      frames: this.scene.anims.generateFrameNames('a-npc-black-cat-sit', {
        prefix: 'black-cat-sit-',
        suffix: '.png',
        start: 1,
        end: 14,
      }),
      frameRate: 2,
      repeat: -1,
    });
  }

  getName() {
    return this.name;
  }

  getSceneName() {
    return this.sceneName;
  }

  initDialog() {
    const npcDialog = this.dialogueModal.getDialogLines(this.name, this.sceneName);
    console.log(!this.dialogueModal.created);

    if (!this.dialogueModal.created) {
      this.dialogueModal.createWindow();
    }
    if (this.mainDialogFinished) {
      this.displayDialog('idle', npcDialog);
    } else {
      this.displayDialog('story', npcDialog);
    }
  }

  displayDialog(key: string, dialogLines: INPCDialogData) {
    if (key === 'story') {
      if (this.mainDialogCounter < dialogLines.story.length) {
        this.dialogueModal.setText(dialogLines.story[this.mainDialogCounter], true);
      } else {
        this.mainDialogFinished = true;
        this.dialogueModal.removeWindow();
        this.idleDialogFinished = true;
      }
      this.mainDialogCounter += 1;
    } else if (key === 'idle') {
      if (this.idleDialogCounter < 1) {
        const randNum = randomGenerator(dialogLines.idle.length);
        this.idleDialogFinished = false;
        this.dialogueModal.setText(dialogLines.idle[randNum], true);
        this.idleDialogCounter += 1;
      } else {
        this.idleDialogFinished = true;
        this.dialogueModal.removeWindow();
        this.idleDialogCounter = 0;
      }
    }
  }

  // displayDialog() {
  //   const npcDialog = this.dialogueModal.getDialogLines(this.name, this.sceneName);
  //   if (!this.dialogueModal.created) {
  //     this.dialogueModal.createWindow();
  //   }
  //   if (this.mainDialogCounter < npcDialog.main.length) {
  //     this.dialogueModal.setText(npcDialog.main[this.mainDialogCounter], true);
  //   } else {
  //     this.mainDialogFinished = true;
  //     this.dialogueModal.removeWindow();
  //   }
  //   this.mainDialogCounter += 1;
  // }

  protected getBody(): Phaser.Physics.Arcade.Body {
    return this.body as Phaser.Physics.Arcade.Body;
  }
}

export default NPC;

import * as Phaser from 'phaser';

class LoadingScene extends Phaser.Scene {
  private cat!: Phaser.GameObjects.Sprite;

  constructor() {
    super({ key: 'LoadingScene' });
  }

  create(): void {
    // TODO MAKE UNIVERSAL LOADING SCREEN
    // this.cat = this.add.sprite(48, 48, 'cat');
    this.scene.start('PlaySceneOne');
  }

  preload(): void {
    this.load.baseURL = 'assets/';
    this.load.image('cat', 'spritesheets/cat-idlesprite.png');

    // Load spritesheets
    this.load.atlas('a-cat-idle', 'spritesheets/cat-idle-atlas.png', 'spritesheets/cat-idle-atlas.json');
    this.load.atlas('a-cat', 'spritesheets/cat-run-atlas.png', 'spritesheets/cat-run-atlas.json');
    this.load.image('cat-jump-1', 'spritesheets/cat-jump-frames/cat-jump-1');
    this.load.image('cat-jump-2', 'spritesheets/cat-jump-frames/cat-jump-2');
    this.load.image('cat-jump-3', 'spritesheets/cat-jump-frames/cat-jump-3');
    this.load.image('cat-jump-4', 'spritesheets/cat-jump-frames/cat-jump-4');
  }
}

export default LoadingScene;

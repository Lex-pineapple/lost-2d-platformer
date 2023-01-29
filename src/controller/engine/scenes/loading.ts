import * as Phaser from 'phaser';

class LoadingScene extends Phaser.Scene {
  private cat!: Phaser.GameObjects.Sprite;

  constructor() {
    super({ key: 'LoadingScene' });
  }

  create(): void {
    // this.cat = this.add.sprite(48, 48, 'cat');
    this.scene.start('PlaySceneOne');
  }

  preload(): void {
    this.load.baseURL = 'assets/';
    this.load.image('cat', 'spritesheets/cat-idlesprite.png');
    this.load.atlas('a-cat', 'spritesheets/run-sprite.png', 'spritesheets/cat-run-atlas.json');
  }
}

export default LoadingScene;
import * as Phaser from 'phaser';
import Button from '../helpers/button';

import arrow from '../../../assets/menu/back_arrow.png';

class LoadingScene extends Phaser.Scene {
  private cat!: Phaser.GameObjects.Sprite;

  constructor() {
    super({ key: 'LoadingScene' });
    // this.initAnims();
  }

  initAnims() {
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNames('a-cat', {
        prefix: 'cat-run-',
        suffix: '.png',
        start: 1,
        end: 5,
      }),
      frameRate: 12,
      repeat: -1,
    });
  }

  getCenterX() {
    return +this.sys.game.config.width / 2;
  }

  getCenterY() {
    return +this.sys.game.config.height / 2;
  }

  createProgressBar(x: number, y: number) {
    const width = 400;
    const height = 20;
    const xStart = x - width / 2;
    const yStart = y - height / 2;
    const progressText = this.add
      .text(x, y - 50, '')
      .setOrigin(0.5)
      .setStyle({
        fontSize: '24px',
      });

    const borderOffset = 2;

    const borderRect = new Phaser.Geom.Rectangle(
      xStart - borderOffset,
      yStart - borderOffset,
      width + borderOffset * 2,
      height + borderOffset * 2 // eslint-disable-line
    );

    const border = this.add.graphics({
      lineStyle: {
        width: 2,
        color: 0x073454,
      },
    });
    border.strokeRectShape(borderRect);
    const progressBar = this.add.graphics();

    const updateProgressBar = function (percentage: number) { // eslint-disable-line
      progressBar.clear();
      progressBar.fillStyle(0x3afefd, 1);
      progressBar.fillRect(xStart, yStart, percentage * width, height);
      progressText.setText(`${Math.ceil(percentage * 100)}%`);
    };

    this.load.on('progress', updateProgressBar);
    this.load.once('complete', () => {
      this.load.off('progress', updateProgressBar);
      this.scene.start('MainMenuScene');
    });
  }

  preload(): void {
    this.load.baseURL = 'assets/';
    this.load.image('cat', 'spritesheets/cat-idlesprite.png');
    this.load.atlas('a-cat-idle', 'spritesheets/cat-idle-atlas.png', 'spritesheets/cat-idle-atlas.json');
    this.load.atlas('a-cat', 'spritesheets/cat-run-atlas.png', 'spritesheets/cat-run-atlas.json');
    this.load.image('cat-jump-1', 'spritesheets/cat-jump-frames/cat-jump-1');
    this.load.image('cat-jump-2', 'spritesheets/cat-jump-frames/cat-jump-2');
    this.load.image('cat-jump-3', 'spritesheets/cat-jump-frames/cat-jump-3');
    this.load.image('cat-jump-4', 'spritesheets/cat-jump-frames/cat-jump-4');
    this.load.image('cat', '../../../assets/spritesheets/cat-idlesprite.png');
    this.load.image('forest', '../../../assets/backgrounds/Backgroundx48.png');
    this.load.image('ground', '../../../assets/tiles/forest-tiles-allx48cut.png');
    this.load.image('menu-arrow', arrow);
    this.load.tilemapTiledJSON('forestGround', '../../../assets/tiles/forest-temp-map.json');
    this.createProgressBar(this.getCenterX(), this.getCenterY());
  }

  create(): void {
    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
      this.scene.start('PlaySceneOne');
    });
  }
}

export default LoadingScene;

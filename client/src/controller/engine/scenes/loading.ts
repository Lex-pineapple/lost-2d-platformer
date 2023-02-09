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
    this.load.image('can', 'spritesheets/objects/pickupCatCan-small.png');
    this.load.image('plantFinal', 'spritesheets/objects/plant-big.png');
    this.load.image('plantPickupSmall', 'spritesheets/objects/plant-small.png');

    this.load.image('cat', 'spritesheets/cat-idlesprite.png');
    this.load.image('cat-wall-slide', 'spritesheets/catWallSlide.png');

    this.load.atlas('a-cat-idle', 'spritesheets/cat-idle-atlas.png', 'spritesheets/cat-idle-atlas.json');
    this.load.atlas('a-cat', 'spritesheets/cat-run-atlas.png', 'spritesheets/cat-run-atlas.json');
    this.load.atlas('a-cat-jump', 'spritesheets/cat-jump-atlas.png', 'spritesheets/cat-jump-atlas.json');
    this.load.atlas('a-cat-sit', 'spritesheets/cat-sit-atlas.png', 'spritesheets/cat-sit-atlas.json');
    this.load.atlas('a-npc1-sit', 'spritesheets/NPC/npc1-sit-atlas.png', 'spritesheets/NPC/npc1-sit-atlas.json');
    this.load.image('cat-jump-1', 'spritesheets/cat-jump-frames/cat-jump-1.png');
    this.load.image('cat-jump-2', 'spritesheets/cat-jump-frames/cat-jump-2.png');
    this.load.image('cat-jump-3', 'spritesheets/cat-jump-frames/cat-jump-3.png');
    this.load.image('cat-jump-4', 'spritesheets/cat-jump-frames/cat-jump-4.png');
    this.load.image('cat', '../../../assets/spritesheets/cat-idlesprite.png');
    this.load.image('forest', '../../../assets/backgrounds/Backgroundx48.png');
    this.load.image('ground', '../../../assets/tiles/forest-tiles-allx48cut.png');
    this.load.image('menu-arrow', arrow);
    this.load.tilemapTiledJSON('forestGround', '../../../assets/tiles/forest-temp-map.json');
    // this.load.image('forest', '../../../assets/backgrounds/Backgroundx48.png');
    this.load.image('forestBG1', '../../../assets/backgrounds/ForestBG1.png');
    this.load.image('forestBG2', '../../../assets/backgrounds/ForestBG2-transition.png');
    this.load.image('forestBG3', '../../../assets/backgrounds/ForestBG3.png');
    this.load.image('cavernBG', '../../../assets/backgrounds/CavernBG.png');
    this.load.image('demonForestBG1', '../../../assets/backgrounds/DemonForestBG1.png');
    this.load.image('demonForestBG2', '../../../assets/backgrounds/DemonForestBG2-transition.png');
    this.load.image('demonForestBG3', '../../../assets/backgrounds/DemonForestBG3.png');
    this.load.image('demonForestBG4', '../../../assets/backgrounds/DemonForestBG4-moon.png');
    this.load.image(
      'demonForest-peaceful-skyTransition', // eslint-disable-next-line
      '../../../assets/backgrounds/demonForest-peacefulForest-transition.png',
    );
    this.load.image('peacefulBG1', '../../../assets/backgrounds/PeacefulBG1-start.png');
    this.load.image('peacefulBG2', '../../../assets/backgrounds/PeacefulBG2.png');

    this.load.image('startForestTiles', '../../../assets/tiles/Forets-TileMap/forestTileMap.png');
    this.load.tilemapTiledJSON('startForestTileMap', '../../../assets/tiles/Forets-TileMap/forestTileMap.json');
    this.load.image('cavernsTiles', '../../../assets/tiles/Cave-TileMap/caveTileMap-yellow.png');
    this.load.tilemapTiledJSON('cavernsTileMap', '../../../assets/tiles/Cave-TileMap/cavernsTileMap.json');
    this.load.image('dark-peacefulForestTiles', '../../../assets/tiles/Forets-TileMap/forestTileMap-Peaceful.png');
    this.load.tilemapTiledJSON(
      'dark-peacefulForestTileMap', // eslint-disable-next-line
      '../../../assets/tiles/Forets-TileMap/dark-peacefulForestTileMap.json'
    );

    this.createProgressBar(this.getCenterX(), this.getCenterY());
  }

  create(): void {
    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
      this.scene.start('PlaySceneOne');
    });
  }
}

export default LoadingScene;

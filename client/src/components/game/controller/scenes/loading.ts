import * as Phaser from 'phaser';
import { ISharedState } from '../../../../types/interfaces';

class LoadingScene extends Phaser.Scene {
  private cat!: Phaser.GameObjects.Sprite;

  constructor(name: string, protected sharedState: ISharedState) {
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
    const loadingText = this.add.text(x, y - 100, 'Now Loading')
      .setOrigin(0.5)
      .setStyle({
        fontSize: '24px',
        strokeThickness: 0.5,
      });
    const progressText = this.add
      .text(x, y - 50, '')
      .setOrigin(0.5)
      .setStyle({
        fontSize: '24px',
        // stroke: '#599191',
        // fontFamily: 'sans-serif',
        strokeThickness: 0.5,
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
      loadingText.setText('Done');
      this.scene.start('MainMenuScene');
    });
  }

  preload(): void {
    this.load.baseURL = 'assets/';
    this.load.image('canPickup', 'spritesheets/objects/pickupCatCan-small.png');
    this.load.image('plantFinal', 'spritesheets/objects/plant-big.png');
    this.load.image('leafPickup', 'spritesheets/objects/plant-small.png');
    this.load.image('energyCanPickup', 'spritesheets/objects/pickupEnergyCan-small.png');
    this.load.image('keyPickup', 'spritesheets/objects/keyPng.png');
    this.load.image('doorLock', 'spritesheets/objects/doorLock.png');
    this.load.image('movingPlatform', 'spritesheets/objects/movingPlatform.png');
    this.load.image('movingPlatform2', 'spritesheets/objects/movingPlatform2.png');
    this.load.image('flowerPickup', 'spritesheets/objects/flowerPickup.png');
    this.load.image('bigFlowerPickup', 'spritesheets/objects/bigFlowerPickup.png');
    this.load.image('healthCanPickup', 'spritesheets/objects/healthCan.png');
    this.load.image('livesHUD', 'spritesheets/objects/livesHUD.png');
    this.load.image('rectangleHUD', 'spritesheets/objects/rectangleHUD.png');
    this.load.image('frontBG', 'backgrounds/FrontBG.png');
    this.load.image('frontBGBlurred', 'backgrounds/FrontBGBlurred.png');
    this.load.image('frontBGcatSprite', 'spritesheets/FrontBG-catSprite.png');
    this.load.image('destructibleBarricade', 'spritesheets/objects/destructibleBarricade.png');
    this.load.image('fullscreenExit', 'spritesheets/objects/fullscreen-exit.png');
    this.load.image('fullscreenOpen', 'spritesheets/objects/fullscreen-open.png');

    this.load.image('infoSign', 'spritesheets/objects/infoSign.png');

    this.load.spritesheet('objectPickups', 'spritesheets/objects/PickupObjectMap.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.atlas(
      'a-enemy-hover',
      'spritesheets/enemy-hover-atlas.png',
      'spritesheets/enemy-hover-atlas.json'
    );

    this.load.image('cat', 'spritesheets/cat-idlesprite.png');
    this.load.image('cat-wall-slide', 'spritesheets/catWallSlide.png');

    this.load.atlas(
      'a-cat-idle',
      'spritesheets/cat-idle-atlas.png',
      'spritesheets/cat-idle-atlas.json'
    );
    this.load.atlas('a-cat', 'spritesheets/cat-run-atlas.png', 'spritesheets/cat-run-atlas.json');
    this.load.atlas(
      'a-cat-jump',
      'spritesheets/cat-jump-atlas.png',
      'spritesheets/cat-jump-atlas.json'
    );
    this.load.atlas(
      'a-cat-attack',
      'spritesheets/cat-attack-atlas.png',
      'spritesheets/cat-attack-atlas.json'
    );
    this.load.atlas(
      'a-cat-sit',
      'spritesheets/cat-sit-atlas.png',
      'spritesheets/cat-sit-atlas.json'
    );
    this.load.atlas(
      'a-npc1-sit',
      'spritesheets/NPC/npc1-sit-atlas.png',
      'spritesheets/NPC/npc1-sit-atlas.json'
    );
    this.load.atlas(
      'a-npc2-sit',
      'spritesheets/NPC/npc2-sit-atlas.png',
      'spritesheets/NPC/npc2-sit-atlas.json'
    );
    this.load.atlas(
      'a-npc-sleep',
      'spritesheets/NPC/cat-sleep-atlas.png',
      'spritesheets/NPC/cat-sleep-atlas.json'
    );
    this.load.atlas(
      'a-npc-lie',
      'spritesheets/NPC/cat-lie-atlas.png',
      'spritesheets/NPC/cat-lie-atlas.json'
    );
    this.load.atlas(
      'a-npc-black-cat-sit',
      'spritesheets/NPC/black-cat-sit-atlas.png',
      'spritesheets/NPC/black-cat-sit-atlas.json'
    );
    this.load.image('cat-jump-1', 'spritesheets/cat-jump-frames/cat-jump-1.png');
    this.load.image('cat-jump-2', 'spritesheets/cat-jump-frames/cat-jump-2.png');
    this.load.image('cat-jump-3', 'spritesheets/cat-jump-frames/cat-jump-3.png');
    this.load.image('cat-jump-4', 'spritesheets/cat-jump-frames/cat-jump-4.png');
    this.load.image('cat', 'spritesheets/cat-idlesprite.png');
    this.load.image('forest', 'backgrounds/Backgroundx48.png');
    // this.load.image('ground', 'tiles/forest-tiles-allx48cut.png');
    this.load.image('menu-arrow', 'menu/back_arrow.png');
    // this.load.tilemapTiledJSON('forestGround', 'tiles/forest-temp-map.json');
    // this.load.image('forest', 'backgrounds/Backgroundx48.png');
    this.load.image('forestBG1', 'backgrounds/ForestBG1.png');
    this.load.image('forestBG2', 'backgrounds/ForestBG2-transition.png');
    this.load.image('forestBG3', 'backgrounds/ForestBG3.png');
    this.load.image('cavernBG', 'backgrounds/CavernBG.png');
    this.load.image('demonForestBG1', 'backgrounds/DemonForestBG1.png');
    this.load.image('demonForestBG2', 'backgrounds/DemonForestBG2-transition.png');
    this.load.image('demonForestBG3', 'backgrounds/DemonForestBG3.png');
    this.load.image('demonForestBG4', 'backgrounds/DemonForestBG4-moon.png');
    this.load.image('demonForestBG5', 'backgrounds/DemonForestBG5-cut.png');
    this.load.image(
      'demonForest-peaceful-skyTransition', // eslint-disable-next-line
      'backgrounds/demonForest-peacefulForest-transition.png',
    );
    this.load.image('peacefulBG1', 'backgrounds/PeacefulBG1-start.png');
    this.load.image('peacefulBG2', 'backgrounds/PeacefulBG2.png');

    this.load.image('door', 'spritesheets/objects/door.png');
    this.load.image('startForestTiles', 'tiles/Forets-TileMap/forestTileMap.png');
    this.load.tilemapTiledJSON('startForestTileMap', 'tiles/Forets-TileMap/forestTileMap.json');
    this.load.image('cavernsTiles', 'tiles/Cave-TileMap/caveTileMap-yellow.png');
    this.load.tilemapTiledJSON('cavernsTileMap', 'tiles/Cave-TileMap/cavernsTileMap.json');
    this.load.image('dark-peacefulForestTiles', 'tiles/Forets-TileMap/forestTileMap-Peaceful.png');
    this.load.tilemapTiledJSON(
      'dark-peacefulForestTileMap', // eslint-disable-next-line
      'tiles/Forets-TileMap/dark-peacefulForestTileMap.json'
    );
    this.load.image('winnerBackground', 'menu/background/winnerBackground.png');
    this.load.image('speechBubble', 'menu/speech-bubble-longest.png');
    this.load.image('gameOverBackground', 'menu/background/gameOverBackground.png');
    this.load.image('gameOverSprite', 'menu/titles/game_over_green.png');

    this.load.audio('forestMusicScene1', 'sounds/music/musicScene1.mp3');
    this.load.audio('cavernMusic', 'sounds/music/musicScene2.mp3');
    this.load.audio('forestMusicScene3', 'sounds/music/musicScene3.mp3');
    this.load.audio('buttonSound', 'sounds/effects/interface/interface.ogg');
    this.load.audio('pickupCoin1', 'sounds/effects/pickup/coin.ogg');
    this.load.audio('pickupCoin2', 'sounds/effects/pickup/coin2.ogg');
    this.load.audio('pickupCoin3', 'sounds/effects/pickup/coin3.mp3');
    this.load.audio('healthPickup', 'sounds/effects/pickup/healthPickup.ogg');
    this.load.audio('keyPuckup', 'sounds/effects/pickup/keyPickup.mp3');
    this.load.audio('hurtSwing', 'sounds/effects/hurts/swing.ogg');
    this.load.audio('doorSound', 'sounds/effects/world/door.ogg');
    this.load.audio('dialogSound', 'sounds/effects/dialog/fast_single_v4.ogg');
    this.load.audio('victoryMusic', 'sounds/music/victory.mp3');
    this.load.audio('gamoOverMusic', 'sounds/music/game_over.mp3');

    this.createProgressBar(this.getCenterX(), this.getCenterY());
  }

  // create(): void {
  //   this.scale.displaySize.setAspectRatio( 800/450 );
  //   this.scale.refresh();
  //   // this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
  //   //   this.scene.start('PlaySceneOne');
  //   // });
  // }
}

export default LoadingScene;

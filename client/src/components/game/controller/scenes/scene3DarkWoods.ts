import Enemy from '../actor/enemy';
import gameObjectsToObjectPoints from '../helpers/gameobject-to-objectpoint';
import { IPlayerPosition, ISharedState } from '../../../../types/interfaces';
import SceneBase from './sceneBase';
import NPC from '../actor/npc';

class PlaySceneThree extends SceneBase {
  private playerX: number | null = null;

  private playerY: number | null = null;

  private finalNPC!: NPC;

  constructor(name: string, protected sharedState: ISharedState) {
    super('PlaySceneThree', sharedState);
  }

  init(data: IPlayerPosition) {
    this.playerX = data.playerX;
    this.playerY = data.playerY;
  }

  create() {
    super.create();
    const worldSize = 16960;
    const BGHeight = 1920;
    this.cameras.main.fadeIn(1000, 0, 0, 0);
    this.tileBackgrounds(BGHeight);
    // this.createEndpoint(worldSize, 0);
    this._loadPlayer();
    if (this.playerX !== null) this.getPlayer().x = this.playerX;
    if (this.playerY !== null) this.getPlayer().y = this.playerY;
    this._setCamera(worldSize, BGHeight);
    const map = this.createPlatforms(
      'dark-peacefulForestTileMap',
      'dark-peacefulTileset',
      'dark-peacefulMap',
      'dark-peacefulForestTiles', // eslint-disable-line
    );
    // this.createFinalEndpaoint(map);
    this.createMovingPlatforms(map);
    const enemyArr = this.createEnemies(map);
    this.initEnemyMovement(enemyArr);
    this.createPitFalls();
    this.createHUD();
    this.createPickups(map, 'leaf');
    this.createPickups(map, 'healthCan');
    this.createPickups(map, 'flower');
    this.initNPCBehaviour();
    this.displayMapName('The Darkling Woods');
    this.createFullscreenSwitch();
    this.createFinalEndpoint(map);

    this.soundServise.playForestMusicScene3();
    this.saveAllDataToSharedState(this.scene.key);

    // this.addEndpointHandler('PlaySceneNext', 0, 420);
  }

  tileBackgrounds(BGHeight: number) {
    const gameWidth = +this.game.config.width;
    const gameHeight = +this.game.config.height;
    this._createBackground('demonForestBG1', 0, gameHeight - BGHeight, 1164, BGHeight);
    this._createBackground('demonForestBG2', 1164, gameHeight - BGHeight, 2298, BGHeight);
    this._createBackground('demonForestBG3', 1164 + 2298, gameHeight - BGHeight, 1000, BGHeight);
    this._createBackground('demonForestBG4', 1164 + 2298 + 1000, gameHeight - BGHeight, 1000, BGHeight);
    this._createBackground('demonForestBG3', 1164 + 2298 + 1000 + 1000, gameHeight - BGHeight, 1800, BGHeight);
    this._createBackground('demonForestBG5', 1164 + 2298 + 1000 + 1000 + 1800, gameHeight - BGHeight, 1207, BGHeight);

    this._createBackground(
      'demonForest-peaceful-skyTransition',
      1164 + 2298 + 1000 + 1000 + 1800 + 1207,
      gameHeight - BGHeight,
      5000,
      BGHeight
    );
    this._createBackground('peacefulBG1', 1164 + 2298 + 1000 + 1000 + 1800 + 1207 + 5000, gameHeight - BGHeight, 1346, BGHeight);
    this._createBackground(
      'peacefulBG2',
      1164 + 2298 + 1000 + 1000 + 1800 + 1207 + 5000 + 1346,
      gameHeight - BGHeight,
      2145,
      BGHeight
    );
  }

  initNPCBehaviour() {
    const NPCArr = [];
    NPCArr.push(new NPC(this, 'NPC1', 608, 364, 'cat', 'PlaySceneThree', 'black-cat-sit'));
    this.finalNPC = new NPC(this, 'NPC2', 16241, -210, 'cat', 'PlaySceneThree', 'black-cat-sit');
    this.finalNPC.flip();

    NPCArr.forEach((npc) => {
      this.physics.add.overlap(this.getPlayer(), npc, () => {
        if (Phaser.Input.Keyboard.JustDown(this.keyF)) {
          this.getPlayer().diableKeys();
          npc.initDialog();
          if (npc.mainDialogFinished && npc.idleDialogFinished) {
            this.getPlayer().enableKeys();
          }
        }
      });
    });
  }

  createFinalEndpoint(map: Phaser.Tilemaps.Tilemap) {
    const finalPlant = gameObjectsToObjectPoints(
      map.filterObjects('FunctionalLayer', (obj) => obj.name === 'finalPlant')
    );

    this.endpoint = this.physics.add.sprite(finalPlant[0].x, 450 - (1920 - finalPlant[0].y), 'bigFlowerPickup')
    .setScale(1)
    .setImmovable(true)
    .setBodySize(64, 117);
    this.physics.add.collider(this.getPlayer(), this.endpoint, (obj1, obj2) => {
      // this.getPlayer().disableRun();
      this.saveScoreToSharedState();
      console.log(this.sharedState.score);

      if (!this.getPlayer().collided) {
        this.tweens.add({
          targets: this.endpoint,
          duration: 500,
          // repeat: 3,
          // yoyo: true,
          alpha: 0,
          onComplete: () => {
            this.getPlayer().diableKeys();
            this.getPlayer().disableRun();
            this.initFinalDialog();
            obj2.destroy();
            this.time.delayedCall(15000, () => {
              this.initWinState();
            });
          },
        });
      }
      this.getPlayer().collided = true;
    });
  }

  initFinalDialog() {
    this.finalNPC.initDialog();
  }

  initWinState() {
    this.cameras.main.fadeOut(1000, 0, 0, 0);
    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
      this.scene.start('WinnerScene');
    });
  }

  createMovingPlatforms(map: Phaser.Tilemaps.Tilemap) {
    const platformPoints = gameObjectsToObjectPoints(
      map.filterObjects('MovingLayer', (obj) => obj.name === 'movingPlatformPoint')
    );
    const platforms = platformPoints.map((point) => this.physics.add.sprite(point.x, 450 - (1920 - point.y), 'movingPlatform').setSize(138, 16).setImmovable(true)
    // .setVelocity(0, 100),
    ); // eslint-disable-line
    platforms.forEach((platform) => platform.body.setAllowGravity(false));

    this.physics.add.collider(this.getPlayer(), platforms[0], () => {
      this.getPlayer().body.velocity.x = 0;
      this.getPlayer().canStick = false;
    });
    this.physics.add.collider(this.getPlayer(), platforms[1], () => {
      this.getPlayer().body.velocity.x = 0;
      this.getPlayer().canStick = false;
      if (!this.getPlayer().onPlatform && platformPoints[1].properties[0].value) {
        this.tweens.timeline({
          targets: platforms[1].body.velocity,
          delay: 300,
          // loop: 0,
          ease: 'Linear',
          duration: 9450,
          tweens: [
            {
              x: 600,
            },
            {
              x: 0,
            },
            ],
            onComplete: () => {
              platforms[1].body.velocity.y = 0;
            },
          });
        }
        this.getPlayer().onPlatform = true;
        platformPoints[1].properties[0].value = false;
    });
    this.physics.add.collider(this.getPlayer(), platforms[2], () => {
      this.getPlayer().body.velocity.x = 0;
      this.getPlayer().canStick = false;
    });
    this.physics.add.collider(this.getPlayer(), platforms[2], () => {
      this.getPlayer().body.velocity.x = 0;
      this.getPlayer().canStick = false;
    });
    this.physics.add.collider(this.getPlayer(), platforms[3], () => {
      this.getPlayer().body.velocity.x = 0;
      this.getPlayer().canStick = false;
    });

    this.tweens.timeline({
      targets: platforms[0].body.velocity,
      delay: 2500,
      loop: -1,
      ease: 'Linear',
      duration: 2500,
      tweens: [
        {
          y: -100,
        },
        {
          y: 100,
        },
        ],
        onComplete: () => {
          platforms[0].body.velocity.x = 0;
        },
    });
    this.tweens.timeline({
      targets: platforms[2].body.velocity,
      delay: 2500,
      loop: -1,
      ease: 'Linear',
      duration: 2500,
      tweens: [
        {
          x: -50,
        },
        {
          x: 50,
        },
        ],
        onComplete: () => {
          platforms[0].body.velocity.x = 0;
        },
    });
    this.tweens.timeline({
      targets: platforms[3].body.velocity,
      delay: 2500,
      loop: -1,
      ease: 'Linear',
      duration: 2500,
      tweens: [
        {
          y: -100,
        },
        {
          y: 100,
        },
        ],
    });
  }

  createPitFalls() {
    const zone = this.add.zone(11128, 450, 6048, 32);
    this.physics.world.enable(zone);
    console.log(this.getPlayer().getHPValue());

    this.physics.add.overlap(this.getPlayer(), zone, () => {
      if (!this.getPlayer().enemyOverlap) {
        this.getPlayer().enemyCollide = true;
        this.getPlayer().getDamage(1, false);
        this.reduceLife();
        if (this.getPlayer().getHPValue() <= 0) {
          this.cameras.main.fadeOut(200, 0, 0, 0);
          this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
            this.scene.start('GameOverScene');
          });
        }
        this.getPlayer().enemyOverlap = true;
        this.restorePlayer();
      }
      // this.time.delayedCall(400, this.restorePlayer);
    });
      // zone.body.setAllowGravity(false);
      // zone.body.moves = false;
    const zone1 = this.add.zone(6528, 450, 256, 32);
    this.physics.world.enable(zone1);
    this.physics.add.overlap(this.getPlayer(), zone1, () => {
      if (!this.getPlayer().enemyOverlap) {
        this.getPlayer().enemyCollide = true;
        this.getPlayer().getDamage(1, false);
        this.reduceLife();
        if (this.getPlayer().getHPValue() <= 0) {
          this.cameras.main.fadeOut(200, 0, 0, 0);
          this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
            this.scene.start('GameOverScene');
          });
        }
        this.getPlayer().enemyOverlap = true;
        this.restorePlayer();
      }
      // this.time.delayedCall(400, this.restorePlayer);
    });
    const zone2 = this.add.zone(2208, 450, 576, 32);
    this.physics.world.enable(zone2);
    this.physics.add.overlap(this.getPlayer(), zone2, () => {
      if (!this.getPlayer().enemyOverlap) {
        this.getPlayer().enemyCollide = true;
        this.getPlayer().getDamage(1, false);
        this.reduceLife();
        if (this.getPlayer().getHPValue() <= 0) {
          this.cameras.main.fadeOut(200, 0, 0, 0);
          this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
            this.scene.start('GameOverScene');
          });
        }
        this.getPlayer().enemyOverlap = true;
      }
      this.restorePlayer();
    });
  }

  restorePlayer() {
      if (this.playerX && this.playerY) {
        this.getPlayer().x = this.playerX;
        this.getPlayer().y = this.playerY;
      }
  }

  initEnemyMovement(enemies: Enemy[]) {
    this.tweens.timeline({
      targets: enemies[0].body.velocity,
      loop: -1,
      ease: 'Linear',
      tweens: [
        {
          x: 200, duration: 5000, delay: 5000,
        },
        {
          x: -200, duration: 5000, delay: 5000,
        },
        ],
    });
    this.tweens.timeline({
      targets: enemies[1].body.velocity,
      loop: -1,
      ease: 'Linear',
      tweens: [
        {
          x: 50, duration: 2000, delay: 2000,
        },
        {
          x: -50, duration: 2000, delay: 2000,
        },
        ],
    });
    this.tweens.timeline({
      targets: enemies[2].body.velocity,
      loop: -1,
      ease: 'Linear',
      tweens: [
        {
          x: -50, duration: 2000, delay: 2000,
        },
        {
          x: 50, duration: 2000, delay: 2000,
        },
        ],
    });
    this.tweens.timeline({
      targets: enemies[3].body.velocity,
      loop: -1,
      ease: 'Linear',
      tweens: [
        {
          x: -200, duration: 5000, delay: 5000,
        },
        {
          x: 200, duration: 5000, delay: 5000,
        },
        ],
    });
    this.tweens.timeline({
      targets: enemies[4].body.velocity,
      loop: -1,
      ease: 'Linear',
      tweens: [
        {
          x: 200, duration: 2000, delay: 2000,
        },
        {
          x: -200, duration: 2000, delay: 2000,
        },
        ],
    });
    this.tweens.timeline({
      targets: enemies[5].body.velocity,
      loop: -1,
      ease: 'Linear',
      tweens: [
        {
          x: 50, duration: 3500, delay: 3500,
        },
        {
          x: -50, duration: 3500, delay: 3500,
        },
        ],
    });
    this.tweens.timeline({
      targets: enemies[6].body.velocity,
      loop: -1,
      ease: 'Linear',
      tweens: [
        {
          x: -50, duration: 3500, delay: 3500,
        },
        {
          x: 50, duration: 3500, delay: 3500,
        },
        ],
    });
    this.tweens.timeline({
      targets: enemies[7].body.velocity,
      loop: -1,
      ease: 'Linear',
      tweens: [
        {
          x: -50, duration: 2500, delay: 2500,
        },
        {
          x: 50, duration: 2500, delay: 2500,
        },
        ],
    });
    this.tweens.timeline({
      targets: enemies[8].body.velocity,
      loop: -1,
      ease: 'Linear',
      tweens: [
        {
          x: 50, duration: 2500, delay: 2500,
        },
        {
          x: -50, duration: 2500, delay: 2500,
        },
        ],
    });
    this.tweens.timeline({
      targets: enemies[9].body.velocity,
      loop: -1,
      ease: 'Linear',
      tweens: [
        {
          x: 100, duration: 3000, delay: 3000,
        },
        {
          x: -100, duration: 3000, delay: 3000,
        },
        ],
    });
    this.tweens.timeline({
      targets: enemies[10].body.velocity,
      loop: -1,
      ease: 'Linear',
      tweens: [
        {
          x: -50, duration: 1500, delay: 1500,
        },
        {
          x: 50, duration: 1500, delay: 1500,
        },
        ],
    });
    this.tweens.timeline({
      targets: enemies[11].body.velocity,
      loop: -1,
      ease: 'Linear',
      tweens: [
        {
          y: 50, duration: 1500, delay: 1500,
        },
        {
          y: -50, duration: 1500, delay: 1500,
        },
        ],
    });
  }

  update(): void {
    this.checkEsc();
    this.getPlayer().update();
  }
}

export default PlaySceneThree;

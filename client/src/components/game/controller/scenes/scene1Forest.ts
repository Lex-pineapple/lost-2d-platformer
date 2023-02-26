import * as Phaser from 'phaser';
import { IPlayerPosition, ISharedState } from '../../../../types/interfaces';

import DialogueModal from '../actor/dialogueModal';
import Enemy from '../actor/enemy';
import NPC from '../actor/npc';
import Player from '../actor/player';
import gameObjectsToObjectPoints from '../helpers/gameobject-to-objectpoint';
import SceneBase from './sceneBase';

class PlaySceneOne extends SceneBase {
  // private player!: Player;
  private NPC1!: NPC;

  private playerX: number | null = null;

  private playerY: number | null = null;

  // dialogueModal!: DialogueModal;

  constructor(name: string, protected sharedState: ISharedState) {
    super('PlaySceneOne', sharedState);
  }

  init(data: IPlayerPosition) {
    this.playerX = data.playerX;
    this.playerY = data.playerY;
  }

  // _loadPlayer() {
  //   this._spawnCharacters();
  // }

  // _spawnCharacters() {
  //   this.player = new Player(this, 100, 300);
  //   this.add.existing(this.player);
  // }

  create() {
    super.create();
    const worldSize = 11000;
    const BGHeight = 1920;
    this.cameras.main.fadeIn(1000, 0, 0, 0);
    this.tileBackgrounds(BGHeight);
    this._loadPlayer();
    this._setCamera(worldSize, BGHeight);
    const map = this.createPlatforms(
      'startForestTileMap', // name of exported file
      'startForestTileset', // name of tileset in tiled
      'startForestMap', // name of layer in tiled
      // eslint-disable-next-line
      'startForestTiles' // name of exported tiles file
    );

    this.createPickups(map, 'leaf');
    this.createPickups(map, 'can');
    const enemyArr = this.createEnemies(map);
    this.initEnemyMovement(enemyArr);
    this.createHUD();
    this.createKey(map);
    // this.createEndpoint(map, 'PlaySceneTwo', 24, 3274);
    this.createEndpoint(map, 'PlaySceneTwo', 7956, -1238);
    this.createMovingPlatforms(map);

    // if (this.playerX !== null) this.getPlayer().x = this.playerX;
    // if (this.playerY !== null) this.getPlayer().y = this.playerY;
    this.initNPCBehaviour();
    this.createInfoPoints(map);
    // this.makeIntro();
    this.soundServise.playForestMusicScene1();
    this.saveAllDataToSharedState(this.scene.key);
  }

  initNPCBehaviour() {
    const NPCArr = [];
    NPCArr.push(new NPC(this, 'NPC1', 5810, -310, 'cat', 'PlaySceneOne', 'sit'));
    NPCArr.push(new NPC(this, 'NPC2', 5812, -1137, 'cat', 'PlaySceneOne', 'sleep'));
    NPCArr.push(new NPC(this, 'NPC3', 7266, -1132, 'cat', 'PlaySceneOne', 'lie'));
    NPCArr.push(new NPC(this, 'NPC4', 8378, -1046, 'cat', 'PlaySceneOne', 'sit2'));
    NPCArr[1].flip();
    NPCArr[1].tint = 0xD68571;

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

  initEnemyMovement(enemies: Enemy[]) {
    this.tweens.timeline({
      targets: enemies[0].body.velocity,
      loop: -1,
      delay: 500,
      ease: 'Linear',
      tweens: [
        {
          y: 20, duration: 500, delay: 500,
        },
        {
          y: -20, duration: 500, delay: 500,
        },
        ],
    });
    this.tweens.timeline({
      targets: enemies[1].body.velocity,
      loop: -1,
      ease: 'Linear',
      tweens: [
        {
          y: 20, duration: 500, delay: 500,
        },
        {
          y: -20, duration: 500, delay: 500,
        },
        ],
    });
    this.tweens.timeline({
      targets: enemies[2].body.velocity,
      loop: -1,
      ease: 'Linear',
      tweens: [
        {
          y: 40, duration: 500, delay: 500,
        },
        {
          y: -40, duration: 500, delay: 500,
        },
        ],
    });
    this.tweens.timeline({
      targets: enemies[6].body.velocity,
      loop: -1,
      ease: 'Linear',
      tweens: [
        {
          y: 40, duration: 1000, delay: 1000,
        },
        {
          y: -40, duration: 1000, delay: 1000,
        },
        ],
    });
    this.tweens.timeline({
      targets: enemies[7].body.velocity,
      loop: -1,
      ease: 'Linear',
      tweens: [
        {
          y: -40, duration: 1000, delay: 1000,
        },
        {
          y: 40, duration: 1000, delay: 1000,
        },
        ],
    });
    this.tweens.timeline({
      targets: enemies[8].body.velocity,
      loop: -1,
      ease: 'Linear',
      tweens: [
        {
          y: -40, duration: 1000, delay: 1000,
        },
        {
          y: 40, duration: 1000, delay: 1000,
        },
        ],
    });
    this.tweens.timeline({
      targets: enemies[9].body.velocity,
      loop: -1,
      ease: 'Linear',
      tweens: [
        {
          y: 40, duration: 1000, delay: 1000,
        },
        {
          y: -40, duration: 1000, delay: 1000,
        },
        ],
    });
    this.tweens.timeline({
      targets: enemies[10].body.velocity,
      loop: -1,
      ease: 'Linear',
      tweens: [
        {
          x: -40, duration: 2000, delay: 2000,
        },
        {
          x: 40, duration: 2000, delay: 2000,
        },
        ],
    });
    this.tweens.timeline({
      targets: enemies[11].body.velocity,
      loop: -1,
      ease: 'Linear',
      tweens: [
        {
          y: 40, duration: 1000, delay: 1000,
        },
        {
          y: -40, duration: 1000, delay: 1000,
        },
        ],
    });
    this.tweens.timeline({
      targets: enemies[12].body.velocity,
      loop: -1,
      ease: 'Linear',
      tweens: [
        {
          y: -40, duration: 1000, delay: 1000,
        },
        {
          y: 40, duration: 1000, delay: 1000,
        },
        ],
    });
    this.tweens.timeline({
      targets: enemies[13].body.velocity,
      loop: -1,
      ease: 'Linear',
      tweens: [
        {
          y: -60, duration: 1000, delay: 1000,
        },
        {
          y: 60, duration: 1000, delay: 1000,
        },
        ],
    });
  }

  tileBackgrounds(BGHeight: number) {
    const gameWidth = +this.game.config.width;
    const gameHeight = +this.game.config.height;
    this._createBackground('forestBG1', 0, gameHeight - BGHeight, 1920, BGHeight);
    this._createBackground('forestBG2', 1920, gameHeight - BGHeight, 2745, BGHeight);
    this._createBackground('forestBG3', 1920 + 2745, gameHeight - BGHeight, 6343, BGHeight);
  }

  createMovingPlatforms(map: Phaser.Tilemaps.Tilemap) {
    const platformPoints = gameObjectsToObjectPoints(
      map.filterObjects('MovingLayer', (obj) => obj.name === 'movingPlatformPoint')
    );
    const platforms = platformPoints.map((point) => this.physics.add.sprite(point.x, 450 - (1920 - point.y), 'movingPlatform').setSize(138, 16).setImmovable(true)
    // .setVelocity(0, 100),
    ); // eslint-disable-line
    platforms[0].body.setAllowGravity(false);
    this.physics.add.collider(this.getPlayer(), platforms[0], () => {
      // this.player.body.velocity.y = 0;
      if (!this.getPlayer().onPlatform) {
        this.tweens.timeline({
          targets: platforms[0].body.velocity,
          delay: 300,
          // loop: 0,
          ease: 'Linear',
          duration: 11600,
          tweens: [
            {
              y: 300,
            },
            ],
            onComplete: () => {
              platforms[0].body.velocity.y = 0;
            },
          });
        }
        this.getPlayer().onPlatform = true;
    });

    this.tweens.timeline({
      targets: platforms[1].body.velocity,
      delay: 2500,
      loop: -1,
      ease: 'Linear',
      duration: 2500,
      tweens: [
        {
          x: 50,
        },
        {
          x: -50,
        },
        ],
        onComplete: () => {
          platforms[1].body.velocity.x = 0;
        },
      });
    platforms[1].body.setAllowGravity(false);
    this.physics.add.collider(this.getPlayer(), platforms[1], () => {
      this.getPlayer().body.velocity.x = 0;
      this.getPlayer().canStick = false;
    });

    this.tweens.timeline({
      targets: platforms[2].body.velocity,
      loop: -1,
      ease: 'Linear',
      tweens: [
        {
          y: -50, duration: 3000, delay: 3000,
        },
        {
          y: 50, duration: 3000, delay: 3000,
        },
        ],
        onComplete: () => {
          platforms[2].body.velocity.x = 0;
        },
      });
    platforms[2].body.setAllowGravity(false);
    this.physics.add.collider(this.getPlayer(), platforms[2], () => {
      this.getPlayer().body.velocity.x = 0;
      this.getPlayer().canStick = false;
    });
  }

  update(): void {
    this.checkEsc();
    this.getPlayer().update();
  }
}

export default PlaySceneOne;

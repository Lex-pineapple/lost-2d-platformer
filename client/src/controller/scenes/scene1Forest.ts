import * as Phaser from 'phaser';
import { IPlayerPosition, ISharedState } from '../../types/interfaces';
import DialogueModal from '../actor/dialogueModal';
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

    this.createPickups(map, 'leaf', 2);
    this.createPickups(map, 'can', 0);
    this.createEnemies(map);
    this.createHUD();
    this.createKey(map);
    // this.createEndpoint(map, 'PlaySceneTwo', 24, 3274);
    this.createEndpoint(map, 'PlaySceneTwo', 7986, -1238);
    this.createMovingPlatforms(map);

    // if (this.playerX !== null) this.getPlayer().x = this.playerX;
    // if (this.playerY !== null) this.getPlayer().y = this.playerY;
    this.initNPCBehaviour();
    this.createInfoPoints(map);
    // this.makeIntro();
    this.soundServise.playForestMusicScene1();
  }

  initNPCBehaviour() {
    const NPCArr = [];
    NPCArr.push(new NPC(this, 'NPC1', 5810, -310, 'cat', 'PlaySceneOne'));
    NPCArr.push(new NPC(this, 'NPC2', 5812, -1142, 'cat', 'PlaySceneOne'));
    NPCArr.push(new NPC(this, 'NPC4', 7266, -1142, 'cat', 'PlaySceneOne'));
    NPCArr.push(new NPC(this, 'NPC4', 8378, -1046, 'cat', 'PlaySceneOne'));

    NPCArr.forEach((npc) => {
      this.physics.add.overlap(this.getPlayer(), npc, () => {
        if (Phaser.Input.Keyboard.JustDown(this.keyF)) {
          this.getPlayer().diableKeys();
          npc.displayDialog();
          if (npc.dialogFinished) {
            this.getPlayer().enableKeys();
          }
        }
      });
    });
  }

  tileBackgrounds(BGHeight: number) {
    const gameWidth = +this.game.config.width;
    const gameHeight = +this.game.config.height;
    this._createBackground('forestBG1', 0, gameHeight - BGHeight, 1920, BGHeight);
    this._createBackground('forestBG2', 1920, gameHeight - BGHeight, 2745, BGHeight);
    this._createBackground('forestBG3', 1920 + 2745, gameHeight - BGHeight, 6343, BGHeight);
  }

  // INCREDIBLY ASS-BACKWARDS! redo or remove?
  createMovingPlatforms(map: Phaser.Tilemaps.Tilemap) {
    const platformPoints = gameObjectsToObjectPoints(
      map.filterObjects('MovingLayer', (obj) => obj.name === 'movingPlatformPoint')
    );
    const platforms = platformPoints.map((point) => this.physics.add.sprite(point.x, 450 - (1920 - point.y), 'movingPlatform').setSize(160, 32).setImmovable(true)
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

    platforms[1].body.setAllowGravity(false);
  }

  update(): void {
    this.checkEsc();
    this.getPlayer().update();
  }
}

export default PlaySceneOne;

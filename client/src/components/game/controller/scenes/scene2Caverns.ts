import { IPlayerPosition, ISharedState } from '../../../../types/interfaces';
import NPC from '../actor/npc';
import gameObjectsToObjectPoints from '../helpers/gameobject-to-objectpoint';
import SceneBase from './sceneBase';

class PlaySceneTwo extends SceneBase {
  private playerX: number | null = null;

  private playerY: number | null = null;

  constructor(name: string, protected sharedState: ISharedState) {
    super('PlaySceneTwo', sharedState);
  }

  init(data: IPlayerPosition) {
    this.playerX = data.playerX;
    this.playerY = data.playerY;
  }

  create() {
    super.create();
    const worldSize = 9024;
    const BGHeight = 4800;
    this.cameras.main.fadeIn(1000, 0, 0, 0);
    this.tileBackgrounds(BGHeight);
    this._loadPlayer();
    if (this.playerX !== null) this.getPlayer().x = this.playerX;
    if (this.playerY !== null) this.getPlayer().y = this.playerY;
    this._setCamera(worldSize, BGHeight);
    const map = this.createPlatforms('cavernsTileMap', 'cavernsTileset', 'cavernsMap', 'cavernsTiles');
    // this.createEndpoint(worldSize, 0);
    // this.addEndpointHandler('PlaySceneThree', 0, 420);7
    this.createPickups(map, 'leaf');
    this.createPickups(map, 'can');
    this.createEnemies(map);
    this.createKey(map);
    this.createEnergyPickup(map);
    // this.createEndpoint(map, 'PlaySceneThree', 15900, -214);
    this.createEndpoint(map, 'PlaySceneThree', 32, 300);
    this.createHUD();
    this.initNPCBehaviour();
    this.createMovingPlatforms(map);
    this.createDestructibleBarricade(map);
    this.displayMapName('The Chrystal Caverns');
    this.createFullscreenSwitch();

    this.soundServise.playCavernMusic();

    this.saveAllDataToSharedState(this.scene.key);
    this.savePlayerStats(this.scene.key);
  }

  tileBackgrounds(BGHeight: number) {
    const gameWidth = +this.game.config.width;
    const gameHeight = +this.game.config.height;
    this._createBackground('cavernBG', 0, gameHeight - 1920, 9000, BGHeight);
  }

  initNPCBehaviour() {
    const NPCArr = [];
    NPCArr.push(new NPC(this, 'NPC1', 834, 3274, 'cat', 'PlaySceneTwo', 'sit'));
    NPCArr.push(new NPC(this, 'NPC2', 6144, 660, 'cat', 'PlaySceneTwo', 'lie'));
    NPCArr.push(new NPC(this, 'NPC3', 6160, 106, 'cat', 'PlaySceneTwo', 'sit'));
    NPCArr[2].flip();
    NPCArr[1].flip();

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

  createMovingPlatforms(map: Phaser.Tilemaps.Tilemap) {
    const platformPoints = gameObjectsToObjectPoints(
      map.filterObjects('MovingLayer', (obj) => obj.name === 'movingPlatformPoint')
    );
    const platformPoints2 = gameObjectsToObjectPoints(
      map.filterObjects('MovingLayer', (obj) => obj.name === 'movingPlatformPoint2')
    );
    const platforms = platformPoints.map((point) => this.physics.add.sprite(point.x, 450 - (1920 - point.y), 'movingPlatform').setSize(138, 16).setImmovable(true));
    const platforms2 = platformPoints2.map((point) => this.physics.add.sprite(point.x, 450 - (1920 - point.y), 'movingPlatform2').setSize(64, 16).setImmovable(true));

    platforms.forEach((platform) => {
      platform.body.setAllowGravity(false);
      this.physics.add.collider(this.getPlayer(), platform, () => {
      this.getPlayer().body.velocity.x = 0;
      this.getPlayer().canStick = false;
      });
    });

    platforms2.forEach((platform) => {
      platform.body.setAllowGravity(false);
      this.physics.add.collider(this.getPlayer(), platform, () => {
      this.getPlayer().body.velocity.x = 0;
      this.getPlayer().canStick = false;
      });
    });

    this.tweens.timeline({
      targets: platforms[0].body.velocity,
      delay: 2500,
      loop: -1,
      ease: 'Linear',
      duration: 2500,
      tweens: [
        {
          x: 100,
        },
        {
          x: -100,
        },
        ],
        onComplete: () => {
          platforms[0].body.velocity.x = 0;
        },
    });
    this.tweens.timeline({
      targets: platforms[1].body.velocity,
      delay: 2500,
      loop: -1,
      ease: 'Linear',
      duration: 2500,
      tweens: [
        {
          x: -100,
        },
        {
          x: 100,
        },
        ],
        onComplete: () => {
          platforms[1].body.velocity.x = 0;
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
          y: -100,
        },
        {
          y: 100,
        },
        ],
        onComplete: () => {
          platforms[2].body.velocity.x = 0;
        },
    });
    this.tweens.timeline({
      targets: platforms[3].body.velocity,
      delay: 2000,
      loop: -1,
      ease: 'Linear',
      duration: 2000,
      tweens: [
        {
          x: -100,
        },
        {
          x: 100,
        },
        ],
        onComplete: () => {
          platforms[3].body.velocity.x = 0;
        },
    });
    this.tweens.timeline({
      targets: platforms[4].body.velocity,
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
          platforms[4].body.velocity.x = 0;
        },
    });
    this.tweens.timeline({
      targets: platforms[5].body.velocity,
      delay: 3000,
      loop: -1,
      ease: 'Linear',
      duration: 3000,
      tweens: [
        {
          y: -100,
        },
        {
          y: 100,
        },
        ],
        onComplete: () => {
          platforms[5].body.velocity.x = 0;
        },
    });
    this.tweens.timeline({
      targets: platforms[6].body.velocity,
      delay: 3000,
      loop: -1,
      ease: 'Linear',
      duration: 3000,
      tweens: [
        {
          y: -150,
        },
        {
          y: 150,
        },
        ],
    });

    this.tweens.timeline({
      targets: platforms2[0].body.velocity,
      delay: 3000,
      loop: -1,
      ease: 'Linear',
      duration: 3000,
      tweens: [
        {
          y: 100,
        },
        {
          y: -100,
        },
        ],
        onComplete: () => {
          platforms2[0].body.velocity.x = 0;
        },
    });
    this.tweens.timeline({
      targets: platforms2[1].body.velocity,
      delay: 2500,
      loop: -1,
      ease: 'Linear',
      duration: 2500,
      tweens: [
        {
          x: 100,
        },
        {
          x: -100,
        },
        ],
        onComplete: () => {
          platforms2[1].body.velocity.x = 0;
        },
    });
    this.tweens.timeline({
      targets: platforms2[2].body.velocity,
      delay: 2500,
      loop: -1,
      ease: 'Linear',
      duration: 2500,
      tweens: [
        {
          x: -100,
        },
        {
          x: 100,
        },
        ],
        onComplete: () => {
          platforms2[2].body.velocity.x = 0;
        },
    });
    this.tweens.timeline({
      targets: platforms2[3].body.velocity,
      delay: 2500,
      loop: -1,
      ease: 'Linear',
      duration: 2500,
      tweens: [
        {
          y: 100,
        },
        {
          y: -100,
        },
        ],
        onComplete: () => {
          platforms2[3].body.velocity.x = 0;
        },
    });
    this.tweens.timeline({
      targets: platforms2[4].body.velocity,
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
          platforms2[4].body.velocity.x = 0;
        },
    });
    this.tweens.timeline({
      targets: platforms2[5].body.velocity,
      delay: 2500,
      loop: -1,
      ease: 'Linear',
      duration: 2500,
      tweens: [
        {
          y: 100,
        },
        {
          y: -100,
        },
        ],
        onComplete: () => {
          platforms2[5].body.velocity.x = 0;
        },
    });
    this.tweens.timeline({
      targets: platforms2[6].body.velocity,
      delay: 1000,
      loop: -1,
      ease: 'Linear',
      duration: 1000,
      tweens: [
        {
          y: -100,
        },
        {
          y: 100,
        },
        ],
        onComplete: () => {
          platforms2[6].body.velocity.x = 0;
        },
    });
  }

  update(): void {
    this.checkEsc();
    this.getPlayer().update();
  }
}

export default PlaySceneTwo;

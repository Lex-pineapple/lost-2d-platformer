import { IPlayerPosition, ISharedState } from '../../../../types/interfaces';
import NPC from '../actor/npc';
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
    this.createEndpoint(map, 'PlaySceneThree', 24, 362);
    this.createHUD();
    this.initNPCBehaviour();
    this.soundServise.playCavernMusic();
  }

  tileBackgrounds(BGHeight: number) {
    const gameWidth = +this.game.config.width;
    const gameHeight = +this.game.config.height;
    this._createBackground('cavernBG', 0, gameHeight - BGHeight, 9000, BGHeight);
  }

  initNPCBehaviour() {
    const NPCArr = [];
    NPCArr.push(new NPC(this, 'NPC1', 6600, 3274, 'cat', 'PlaySceneTwo'));
    NPCArr.push(new NPC(this, 'NPC2', 6144, 650, 'cat', 'PlaySceneTwo'));
    NPCArr.push(new NPC(this, 'NPC3', 6160, 106, 'cat', 'PlaySceneTwo'));

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

  update(): void {
    this.checkEsc();
    this.getPlayer().update();
  }
}

export default PlaySceneTwo;

import * as Phaser from 'phaser';
import DialogueModal from '../actor/dialogueModal';
import NPC from '../actor/npc';
import Player from '../actor/player';
import SceneCreater from './sceneCreater';

class PlaySceneOne extends SceneCreater {
  // private player!: Player;
  private NPC1!: NPC;

  dialogueModal!: DialogueModal;

  constructor() {
    super('PlaySceneOne');
  }

  // _loadPlayer() {
  //   this._spawnCharacters();
  // }

  // _spawnCharacters() {
  //   this.player = new Player(this, 100, 300);
  //   this.add.existing(this.player);
  // }

  create() {
    const worldSize = 11000;
    const BGHeight = 1920;
    this.cameras.main.fadeIn(1000, 0, 0, 0);
    this.tileBackgrounds(BGHeight);
    this._loadPlayer();
    this._setCamera(worldSize, BGHeight);
    const platforms = this.createPlatforms(
      'startForestTileMap', // name of exported file
      'startForestTileset', // name of tileset in tiled
      'startForestMap', // name of layer in tiled
      'startForestTiles', // name of exported tiles file
    );
    this.createHUD();
    // this.NPC1 = new NPC(this, 'Cat1', 1940, -300, 'cat');
    // this.add.existing(this.NPC1);
    // this.physics.add.collider(this.NPC1, platforms);
    // this.dialogueModal = new DialogueModal(this, {});
    // this.dialogueModal.setText("Wow you're back! Are you looking for the elder? He is just down the path. I would have shown you but  I've been waiting for the flower delivery all day and can't really leave my home...", true);
    this.initNPCBehaviour();
  }

  initNPCBehaviour() {
    const NPC1 = new NPC(this, 'Cat1', 5750, 450-758, 'cat');
    const NPC2 = new NPC(this, 'Cat2', 8400, 450-1494, 'cat');
    // const NPC3 = new NPC(this, 'Cat1', 1940, -300, 'cat');
    // const NPC4 = new NPC(this, 'Cat1', 1940, -300, 'cat');
    
    this.physics.add.overlap(this.getPlayer(), NPC1, () => {
      this.getPlayer().setOverlap(true);
      this.getPlayer().getOverlapSprite('NPC1', 'PlaySceneOne');
      // this.getPlayer().getOverlapSprite('NPC2', 'PlaySceneOne');

      // this.input.keyboard.enabled = false;
      // this.dialogueModal.displayNPCdialogue('NPC1', 'PlaySceneOne');
    });
  }

  tileBackgrounds(BGHeight: number) {
    const gameWidth = +this.game.config.width;
    const gameHeight = +this.game.config.height;
    this._createBackground('forestBG1', 0, gameHeight - BGHeight, 1920);
    this._createBackground('forestBG2', 1920, gameHeight - BGHeight, 2745);
    this._createBackground('forestBG3', 1920 + 2745, gameHeight - BGHeight, 6343);
  }

  update(): void {
    this.getPlayer().update();
  }
}

export default PlaySceneOne;

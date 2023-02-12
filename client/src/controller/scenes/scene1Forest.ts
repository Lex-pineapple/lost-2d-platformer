import * as Phaser from 'phaser';
import DialogueModal from '../actor/dialogueModal';
import NPC from '../actor/npc';
import Player from '../actor/player';
import SceneBase from './sceneBase';

class PlaySceneOne extends SceneBase {
  // private player!: Player;
  private NPC1!: NPC;

  private playerX: number | null = null;

  private playerY: number | null = null;

  dialogueModal!: DialogueModal;

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
    const worldSize = 9000;
    const BGHeight = 1920;
    this.cameras.main.fadeIn(1000, 0, 0, 0);
    this.tileBackgrounds(BGHeight);

    this.createEndpoint(worldSize, 0);

    this._loadPlayer();

    // if (this.playerX !== null) this.getPlayer().x = this.playerX;
    // if (this.playerY !== null) this.getPlayer().y = this.playerY;

    this._setCamera(worldSize, BGHeight);

    const platforms = this.createPlatforms(
      'startForestTileMap', // name of exported file
      'startForestTileset', // name of tileset in tiled
      'startForestMap', // name of layer in tiled
      'startForestTiles' // name of exported tiles file
    );

    this.addEndpointHandler('PlaySceneTwo', 0, 420);

    this.NPC1 = new NPC(this, 'Cat1', 1940, -300, 'cat');
    // this.add.existing(this.NPC1);
    this.physics.add.collider(this.NPC1, platforms);
    this.dialogueModal = new DialogueModal(this, {});
    this.dialogueModal.setText(
      "Wow you're back! Are you looking for the elder? He is just down the path. I would have shown you but  I've been waiting for the flower delivery all day and can't really leave my home...",
      true
    );
  }

  tileBackgrounds(BGHeight: number) {
    const gameWidth = +this.game.config.width;
    const gameHeight = +this.game.config.height;
    this._createBackground('forestBG1', 0, gameHeight - BGHeight, 1920);
    this._createBackground('forestBG2', 1920, gameHeight - BGHeight, 2745);
    this._createBackground('forestBG3', 1920 + 2745, gameHeight - BGHeight, 6343);
  }

  // createPlatforms() {
  //   const map = this.make.tilemap({ key: 'startForestTileMap' });
  //   const tileset = map.addTilesetImage('startForestTileset', 'startForestTiles');
  //   const platforms = map.createLayer('startForestMap', tileset, 0, -1470);

  //   // // Dont forget to set collision to each tile in tiled!
  //   platforms.setCollisionByProperty({ collides: true });
  //   this.physics.add.collider(this.player, platforms);
  // }

  // _setCamera(worldWidth: number, worldHeight: number) {
  //   this.cameras.main.setBounds(0, -1470, worldWidth, worldHeight, true);
  //   this.physics.world.setBounds(0, -1470, worldWidth, worldHeight, true, true, false);
  //   this.cameras.main.startFollow(this.player, true, 0.5, 0.5);
  // }

  // _createBackground(name: string, x: number, y: number, width: number) {
  //   this.add.tileSprite(x, y, width, 1920, name).setOrigin(0);
  // }

  update(): void {
    this.checkEsc();
    this.getPlayer().update();
  }
}

export default PlaySceneOne;

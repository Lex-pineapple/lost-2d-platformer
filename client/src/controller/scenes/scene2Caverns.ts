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
    const worldSize = 9000;
    const BGHeight = 4800;
    this.cameras.main.fadeIn(1000, 0, 0, 0);
    this.tileBackgrounds(BGHeight);

    this.createEndpoint(worldSize, 0);

    this._loadPlayer();

    if (this.playerX !== null) this.getPlayer().x = this.playerX;
    if (this.playerY !== null) this.getPlayer().y = this.playerY;

    this._setCamera(worldSize, BGHeight);

    this.createPlatforms('cavernsTileMap', 'cavernsTileset', 'cavernsMap', 'cavernsTiles');

    this.addEndpointHandler('PlaySceneThree', 0, 420);
  }

  tileBackgrounds(BGHeight: number) {
    const gameWidth = +this.game.config.width;
    const gameHeight = +this.game.config.height;
    this._createBackground('cavernBG', 0, gameHeight - BGHeight, 9000);
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

export default PlaySceneTwo;

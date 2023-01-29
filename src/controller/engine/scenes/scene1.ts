import * as Phaser from 'phaser';
import Player from '../actor/player';

class PlaySceneOne extends Phaser.Scene {
  private player!: Player;

  constructor() {
    super({ key: 'PlaySceneOne' });
  }

  preload() {
    this.load.json('level:1', '../../../data/levelData/level01.json');
    this.load.image('cat', '../../../assets/spritesheets/cat-idlesprite.png');
    this.load.image('forest', '../../../assets/backgrounds/Background.png');
    this.load.image('ground', '../../../assets/tiles/forest-tile.png');
    this.load.tilemapTiledJSON('forestGround', '../../../assets/tiles/forest-temp-map.json');
  }

  _loadLevel(data: IJSONData) {
    // data.platforms.forEach(this._spawnPlatform, this);
    this._spawnCharacters();
  }

  // _spawnPlatform(platform: IPlatformData) {
  //   this.add.sprite(platform.x, platform.y, platform.image);
  // }

  _spawnCharacters() {
    this.player = new Player(this, 48, 48);
    this.add.existing(this.player);
  }

  create() {
    // this.add.image(
    //   +this.game.config.width / 2,
    //   +this.game.config.height / 2,
    //   'forest'
    // );
    // this.player = new Player(this, 100, 100);
    this.add.tileSprite(+this.game.config.width / 2, +this.game.config.height / 2, 1500, 793, 'forest');
    this._loadLevel(this.game.cache.json.get('level:1'));

    const map = this.make.tilemap({ key: 'forestGround' });
    const tileset = map.addTilesetImage('forestGround', 'ground');
    const platforms = map.createLayer('forestGround', tileset, 0, 200);
    platforms.setCollisionByProperty({ collides: true });
    // platforms.setCollision([0, 1, 2, 3], true);
    this.physics.add.collider(this.player, platforms);
    this.cameras.main.setBounds(0, 0, 1000, 793, true);
    this.physics.world.setBounds(0, 0, 1000, 793, true, true, false);
    this.cameras.main.startFollow(this.player, true, 0.5, 0.5);
  }

  update(): void {
    this.player.update();
  }
}

export default PlaySceneOne;

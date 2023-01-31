import * as Phaser from 'phaser';
import Player from '../actor/player';

class PlaySceneOne extends Phaser.Scene {
  private player!: Player;

  constructor() {
    super({ key: 'PlaySceneOne' });
  }

  preload() {
    // this.load.json('level:1', '../../../data/levelData/level01.json');
    this.load.image('cat', '../../../assets/spritesheets/cat-idlesprite.png');
    this.load.image('forest', '../../../assets/backgrounds/Backgroundx48.png');
    this.load.image('ground', '../../../assets/tiles/forest-tiles-allx48cut.png');
    this.load.tilemapTiledJSON('forestGround', '../../../assets/tiles/forest-temp-map.json');
  }

  _loadPlayer(data: IJSONData) {
    // data.platforms.forEach(this._spawnPlatform, this);
    this._spawnCharacters();
  }

  // _spawnPlatform(platform: IPlatformData) {
  //   this.add.sprite(platform.x, platform.y, platform.image);
  // }

  _spawnCharacters() {
    this.player = new Player(this, 48, 300);
    this.add.existing(this.player);
  }

  create() {
    // this.add.image(
    //   +this.game.config.width / 2,
    //   +this.game.config.height / 2,
    //   'forest'
    // );
    // console.log(this.add.image(
    //   465,
    //   -75,
    //   'forest'
    // ));

    // this.player = new Player(this, 100, 100);
    // this.add.image(0, 0, 'forest');

    // 2nd parameter sets background exactly to left bottom
    // this.add.image(
    //   this.textures.get('forest').getSourceImage().width / 2,
    //   +this.game.config.height - this.textures.get('forest').getSourceImage().height / 2,
    //   'forest'
    // );

    const bgOffset = +this.game.config.height - this.textures.get('forest').getSourceImage().height / 2;
    const worldSize = 4000;
    // 2nd parameter sets background exactly to left bottom
    this.add.tileSprite(this.textures.get('forest').getSourceImage().width / 2, bgOffset, 4000, 1056, 'forest');
    this._loadPlayer(this.game.cache.json.get('level:1'));

    const map = this.make.tilemap({ key: 'forestGround' });
    const tileset = map.addTilesetImage('ts1', 'ground');
    const platforms = map.createLayer(
      'ts2',
      tileset,
      0,
      -(this.textures.get('forest').getSourceImage().height / 2 - bgOffset)
    );

    // // Dont forget to set collision to each tile in tiled!
    platforms.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.player, platforms);
    console.log(this.textures.get('forest').getSourceImage().width / 2);

    this.cameras.main.setBounds(
      0,
      0,
      worldSize / 2 + this.textures.get('forest').getSourceImage().width / 2,
      450,
      true
    );
    this.physics.world.setBounds(
      0,
      0,
      worldSize / 2 + this.textures.get('forest').getSourceImage().width / 2,
      450,
      true,
      true,
      false
    );
    this.cameras.main.startFollow(this.player, true, 0.5, 0.5);
  }

  update(): void {
    this.player.update();
  }
}

export default PlaySceneOne;

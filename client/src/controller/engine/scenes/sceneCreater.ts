import DialogueModal from '../actor/dialogueModal';
import Player from '../actor/player';

class SceneCreater extends Phaser.Scene {
  private player!: Player;

  constructor(name: string) {
    super({ key: name });
  }

  _loadPlayer() {
    this._spawnCharacters();
  }

  _spawnCharacters() {
    this.player = new Player(this, 100, 100);
    this._addPlayer();
  }

  _addPlayer() {
    this.add.existing(this.player);
  }

  createPlatforms(platformsKey: string, platformTs: string, platformMap: string, tileImg: string) {
    const map = this.make.tilemap({ key: platformsKey });
    const tileset = map.addTilesetImage(platformTs, tileImg);
    const platforms = map.createLayer(platformMap, tileset, 0, -1470);
    // // Dont forget to set collision to each tile in tiled!
    platforms.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.player, platforms);

    // this.pickupLayer = map.getObjectLayer('plantSmall');
    // this.setPickups(this.pickupLayer);
    return platforms;
  }

  // collectPickup(player: Player, pickup: Phaser.GameObjects.GameObject) {
  //   pickup.destroy()
  // }

  _setCamera(worldWidth: number, worldHeight: number) {
    this.cameras.main.setBounds(0, -1470, worldWidth, worldHeight, true);
    this.physics.world.setBounds(0, -1470, worldWidth, worldHeight, true, true, false);
    this.cameras.main.startFollow(this.player, true, 0.5, 0.5);
  }

  _createBackground(name: string, x: number, y: number, width: number) {
    this.add.tileSprite(x, y, width, 1920, name).setOrigin(0);
  }

  getPlayer() {
    return this.player;
  }
}

export default SceneCreater;

import DialogueModal from '../actor/dialogueModal';
import Player from '../actor/player';

class SceneBase extends Phaser.Scene {
  private player!: Player;

  protected endpoint!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  private keyESC!: Phaser.Input.Keyboard.Key;

  constructor(name: string, protected sharedState: ISharedState) {
    super({ key: name });
  }

  create() {
    this.keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
  }

  update() {
    this.checkEsc();
  }

  checkEsc() {
    if (Phaser.Input.Keyboard.JustDown(this.keyESC)) {
      if (!this.scene.isPaused()) {
        this.scene.launch('PauseMenuScene', { key: this.scene.key });
        this.scene.pause();

        this.sharedState.playableScenePaused = this.scene.key;
      }
    }
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

  createEndpoint(worldWidth: number, posY: number) {
    // Get the rightmost bound of the scene
    // const rightBound = this.physics.world.bounds.width;
    // This doesn't work because the world bounds are set after this method is called
    // But we need to call it before _loadPlayer so that player
    // is in front of the door, not behind it
    this.endpoint = this.physics.add.sprite(0, 0, 'door')
      .setOrigin(0, 1)
      .setScale(3)
      .setImmovable(true);
    this.endpoint.x = worldWidth - this.endpoint.displayWidth - 10;
    this.endpoint.y = posY;
    this.endpoint.setBodySize(this.endpoint.displayWidth, this.endpoint.displayHeight - 40);
    // .setDisplaySize(200, 200);
  }

  addEndpointHandler(nextSceneKey: string, playerPosX: number, playerPosY: number) {
    const prevX = this.player.x;
    const prevY = this.player.y;

    this.physics.add.overlap(this.player, this.endpoint, () => {
      if (
        this.endpoint
        && (prevX !== this.player.x || prevY !== this.player.y)
        && this.player.x > this.endpoint.x + (this.player.width / 2)
        && this.player.x < this.endpoint.x + this.endpoint.displayWidth + (this.player.width / 2)
        && this.player.y < this.endpoint.y - (this.player.height / 2)
        && this.player.y > this.endpoint.y - this.endpoint.displayHeight - (this.player.height / 2)
      ) {
        this.scene.start(
          nextSceneKey,
          // Set player's coordinates to specific point in next scene
          {
            playerX: playerPosX + (this.player.width / 2),
            playerY: playerPosY + (this.player.height / 2),
          }
        );
      }
    });

    // // Get the rightmost bound of the scene
    // const rightBound = this.physics.world.bounds.width;

    // // Check if the player has reached the rightmost bound
    // if (this.player.x >= rightBound - (this.player.width / 2)) {
    //   // Transition to the next scene
    //   this.scene.start(nextSceneKey);
    // }
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

export default SceneBase;

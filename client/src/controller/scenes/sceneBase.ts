import { ISharedState } from '../../types/interfaces';
import DialogueModal from '../actor/dialogueModal';
import Enemy from '../actor/enemy';
import Player from '../actor/player';
import gameObjectsToObjectPoints from '../helpers/gameobject-to-objectpoint';

class SceneBase extends Phaser.Scene {
  private player!: Player;

  protected endpoint!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  private keyESC!: Phaser.Input.Keyboard.Key;

  private scoreText!: Phaser.GameObjects.Text;

  private livesText!: Phaser.GameObjects.Text;

  score: number;

  constructor(name: string, protected sharedState: ISharedState) {
    super({ key: name });
    this.score = 0;
  }

  create() {
    this.keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
  }

  update() {    
    this.checkEsc();
  }

  createHUD() {
    this.scoreText = this.add.text(16, 16, 'Score: 0').setPadding(10).setStyle({
      fontSize: '28px',
      backgroundColor: '#073454',
      fill: '#3afefd',
    });
    this.livesText = this.add.text(300, 16, 'Lives: 3').setPadding(10).setStyle({
      fontSize: '28px',
      backgroundColor: '#073454',
      fill: '#3afefd',
    });
    this.scoreText.scrollFactorX = 0;
    this.scoreText.scrollFactorY = 0;
    this.livesText.scrollFactorX = 0;
    this.livesText.scrollFactorY = 0;
  }

  createPlatforms(platformsKey: string, platformTs: string, platformMap: string, tileImg: string) {
    const map = this.make.tilemap({ key: platformsKey });
    const tileset = map.addTilesetImage(platformTs, tileImg);
    const platforms = map.createLayer(platformMap, tileset, 0, -1470);
    // // Dont forget to set collision to each tile in tiled!
    platforms.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.player, platforms);

    const pickupObjects = map.createFromObjects('EntityLayer', {});
    pickupObjects.forEach((coin) => {
      this.physics.world.enable(coin);
    });
    this.createPickups(map, 'leaf', 2);
    this.createPickups(map, 'can', 0);
    this.createEnemies(map);
    return platforms;
  }

  increaseScore(type: string) {
    if (type === 'leaf') {
      this.score += 10;
      this.scoreText.setText(`Score: ${this.score}`);
    }
    if (type === 'can') {
      this.score += 100;
      this.scoreText.setText(`Score: ${this.score}`);
    }
  }

  reduceLife() {
    this.livesText.setText(`Lives: ${this.player.getHPValue()}`);
  }

  createPickups(map: Phaser.Tilemaps.Tilemap, type: string, frame: number) {
    const objectPoints = gameObjectsToObjectPoints(
      map.filterObjects('EntityLayer', (obj) => obj.name === `${type}Point`)
    );
    if (objectPoints) {
      const pickups = objectPoints.map((point) => this.physics.add.sprite(point.x, 450 - (1920 - point.y), 'objectPickups', frame).setScale(1.5).setSize(16, 16),
      );
      pickups.forEach((leaf) => {
        this.physics.add.overlap(this.player, leaf, (obj1, obj2) => {
          obj2.destroy();
          this.increaseScore(type);
        });
      });
    }
  }

  createEnemies(map: Phaser.Tilemaps.Tilemap) {
    const enemyPoints = gameObjectsToObjectPoints(
      map.filterObjects('EnemyLayer', (obj) => obj.name === 'commonEnemyPoint')
    );

    const enemies = enemyPoints.map((point) => new Enemy(this, point.x, 450 - (1920 - point.y), 'cat'));
    enemies.forEach((enemy) => {
      this.physics.add.overlap(this.player, enemy, () => {
        this.reduceLife();
        this.player.enemyCollide = true;
        if (this.getPlayer().getHPValue() <= 0) {
          this.cameras.main.fadeOut(200, 0, 0, 0);
          this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
            this.scene.start('GameOverScene');
          });
        }
        
      // });
      // this.physics.add.collider(this.player, enemy, () => {
      //   this.getPlayer().getDamage(1);
      //   this.reduceLife();
      // });
      });
    });
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
    this.cameras.main.startFollow(this.player, true, 0.5, 0.5, 0, 100);
  }

  _createBackground(name: string, x: number, y: number, width: number) {
    this.add.tileSprite(x, y, width, 1920, name).setOrigin(0);
  }

  getPlayer() {
    return this.player;
  }
}

export default SceneBase;

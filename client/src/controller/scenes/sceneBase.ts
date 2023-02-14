import TouchEventStop from 'phaser3-rex-plugins/plugins/toucheventstop';
import { ISharedState } from '../../types/interfaces';
import DialogueModal from '../actor/dialogueModal';
import Enemy from '../actor/enemy';
import Player from '../actor/player';
import gameObjectsToObjectPoints from '../helpers/gameobject-to-objectpoint';

class SceneBase extends Phaser.Scene {
  private player!: Player;

  private keyESC!: Phaser.Input.Keyboard.Key;

  keyF!: Phaser.Input.Keyboard.Key;

  private scoreText!: Phaser.GameObjects.Text;

  private livesText!: Phaser.GameObjects.Text;

  protected endpoint!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  score: number;

  constructor(name: string, protected sharedState: ISharedState) {
    super({ key: name });
    this.score = 0;
  }

  create() {
    this.keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    this.keyF = this.input.keyboard.addKey('F');

  }

  update() {
    this.checkEsc();
  }

  createHUD() {
    this.scoreText = this.add.text(16, 16, `Score: ${this.score}`).setPadding(10).setStyle({
      fontSize: '28px',
      backgroundColor: '#073454',
      fill: '#3afefd',
    });
    this.livesText = this.add.text(300, 16, `Lives: ${this.player.getHPValue()}`).setPadding(10).setStyle({
      fontSize: '28px',
      backgroundColor: '#073454',
      fill: '#3afefd',
    });
    this.scoreText.scrollFactorX = 0;
    this.scoreText.scrollFactorY = 0;
    this.livesText.scrollFactorX = 0;
    this.livesText.scrollFactorY = 0;
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

  createPlatforms(platformsKey: string, platformTs: string, platformMap: string, tileImg: string) {
    const map = this.make.tilemap({ key: platformsKey });
    const tileset = map.addTilesetImage(platformTs, tileImg, 32, 32);
    const platforms = map.createLayer(platformMap, tileset, 0, -1470);
    // // Dont forget to set collision to each tile in tiled!
    platforms.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.player, platforms);
    return map;
  }


  createPickups(map: Phaser.Tilemaps.Tilemap, type: string, frame: number) {
    const objectPoints = gameObjectsToObjectPoints(
      map.filterObjects('EntityLayer', (obj) => obj.name === `${type}Point`)
    );
    const pickups = objectPoints.map((point) => this.physics.add.sprite(point.x, 450 - (1920 - point.y), 'objectPickups', frame).setScale(1.5).setSize(16, 16),
    );
    pickups.forEach((leaf) => {
      this.physics.add.overlap(this.player, leaf, (obj1, obj2) => {
        obj2.destroy();
        this.increaseScore(type);
      });
    });
  }

  createKey(map: Phaser.Tilemaps.Tilemap) {
    const keyPoint = gameObjectsToObjectPoints(
      map.filterObjects('FunctionalLayer', (obj) => obj.name === 'keyPoint')
    );

    const key = this.physics.add.sprite(keyPoint[0].x, 450 - (1920 - keyPoint[0].y), 'keyPickup')
    .setScale(1)
    .setImmovable(true)
    .setBodySize(64, 55);
    this.physics.add.overlap(this.player, key, (obj1, obj2) => {
      this.player.hasKey = true;
      obj2.destroy();
    });
  }

  createEndpoint(map: Phaser.Tilemaps.Tilemap, nextSceneKey: string, posX: number, posY: number) {
    const doorPoint = gameObjectsToObjectPoints(
      map.filterObjects('FunctionalLayer', (obj) => obj.name === 'doorPoint')
    );

    this.endpoint = this.physics.add.sprite(doorPoint[0].x, 450 - (1920 - doorPoint[0].y), 'doorLock')
    .setScale(1)
    .setImmovable(true)
    .setBodySize(64, 55);
    this.physics.add.collider(this.player, this.endpoint, (obj1, obj2) => {
      if (this.player.hasKey && !this.player.collided) {
        this.tweens.add({
          targets: this.endpoint,
          duration: 100,
          repeat: 3,
          yoyo: true,
          alpha: 0.5,
          onComplete: () => {
            this.endpoint.setAlpha(1);
            obj2.destroy();
            this.beginTransition(nextSceneKey, posX, posY);
          },
        });
      }
      this.player.collided = true;
    });
  }

  createFinalEndpoint(map: Phaser.Tilemaps.Tilemap) {
    const finalPlant = gameObjectsToObjectPoints(
      map.filterObjects('FunctionalLayer', (obj) => obj.name === 'finalPlant')
    );

    this.endpoint = this.physics.add.sprite(finalPlant[0].x, 450 - (1920 - finalPlant[0].y), 'plantFinal')
    .setScale(1)
    .setImmovable(true)
    .setBodySize(64, 55);
    this.physics.add.collider(this.player, this.endpoint, (obj1, obj2) => {
      this.player.diableKeys();
      this.player.disableRun();
      console.log('Win!!!!!!!!!!!!');
    });
  }

  beginTransition(nextSceneKey: string, posX: number, posY: number) {
    this.player.diableKeys();
    this.cameras.main.fadeOut(1000, 0, 0, 0);
    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
      this.handleEndpointChange(nextSceneKey, posX, posY);
    });
  }

  handleEndpointChange(nextSceneKey: string, playerPosX: number, playerPosY: number) {
    this.scene.start(
      nextSceneKey,
      // Set player's coordinates to specific point in next scene
      {
        playerX: playerPosX,
        playerY: playerPosY,
      }
    );
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
    this.player = new Player(this, 11000, 450-758);
    this._addPlayer();
  }

  _addPlayer() {
    this.add.existing(this.player);
  }

  _setCamera(worldWidth: number, worldHeight: number) {
    this.cameras.main.setBounds(0, -1470, worldWidth, worldHeight, true);
    this.physics.world.setBounds(0, -1470, worldWidth + 500, worldHeight, true, true, false);
    this.cameras.main.startFollow(this.player, true, 0.5, 0.5, 0, 100);
  }

  _createBackground(name: string, x: number, y: number, width: number, height: number) {
    this.add.tileSprite(x, y, width, height, name).setOrigin(0);
  }

  getPlayer() {
    return this.player;
  }
}

export default SceneBase;

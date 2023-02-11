import { ISharedState } from '../../types/interfaces';
import DialogueModal from '../actor/dialogueModal';
import Player from '../actor/player';
import gameObjectsToObjectPoints from '../helpers/gameobject-to-objectpoint';

class SceneBase extends Phaser.Scene {
  private player!: Player;

  private keyESC!: Phaser.Input.Keyboard.Key;

  private scoreText!: Phaser.GameObjects.Text;

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
    this.scoreText.scrollFactorX = 0;
    this.scoreText.scrollFactorY = 0;
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

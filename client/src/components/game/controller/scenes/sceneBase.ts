import TouchEventStop from 'phaser3-rex-plugins/plugins/toucheventstop';
import { ISharedState, ITutorialFlow } from '../../../../types/interfaces';
import Enemy from '../actor/enemy';
import Player from '../actor/player';
import gameObjectsToObjectPoints from '../helpers/gameobject-to-objectpoint';
import tutorialFlow from '../../../../assets/data/tutorialFlow';
import SoundService from '../audio/soundServise';
import { SaveItems, saveToLocalStorage } from '../helpers/localStorage';

interface ICollidedObject extends Phaser.Types.Physics.Arcade.GameObjectWithBody {
  properties?: {
    collides: boolean;
    noStick?: boolean;
  }
}

class SceneBase extends Phaser.Scene {
  private player!: Player;

  private keyESC!: Phaser.Input.Keyboard.Key;

  keyF!: Phaser.Input.Keyboard.Key;

  keyR!: Phaser.Input.Keyboard.Key;

  private scoreText!: Phaser.GameObjects.Text;

  private livesText!: Phaser.GameObjects.Text;

  protected endpoint!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  score!: number;

  soundServise!: SoundService;

  constructor(name: string, protected sharedState: ISharedState) {
    super({ key: name });
  }

  preload() {
    this.initServices();
  }

  create() {
    this.keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    this.keyF = this.input.keyboard.addKey('F');
    this.keyR = this.input.keyboard.addKey('R');
  }

  update() {
    this.checkEsc();
  }

  createHUD() {
    this.score = (this.sharedState.score) ? +this.sharedState.score : 0;

    const livesHUD = this.add.image(700, 16, 'livesHUD').setOrigin(0, 0);
    const rectangleHUD = this.add.image(16, 16, 'rectangleHUD').setOrigin(0, 0);

    this.scoreText = this.add.text(16, 16, `Score: ${this.score}`).setPadding(10).setStyle({
      fontSize: '28px',
      stroke: '#e9642b',
      strokeThickness: 1,
      // backgroundColor: '#073454',
      fill: '#e9642b',
    });
    this.livesText = this.add.text(748, 16, `${this.player.getHPValue()}`).setPadding(10).setStyle({
      fontSize: '28px',
      stroke: '#e9642b',
      strokeThickness: 1,
      // backgroundColor: '#073454',
      fill: '#e9642b',
    });
    livesHUD.scrollFactorX = 0;
    livesHUD.scrollFactorY = 0;
    rectangleHUD.scrollFactorX = 0;
    rectangleHUD.scrollFactorY = 0;
    this.scoreText.scrollFactorX = 0;
    this.scoreText.scrollFactorY = 0;
    this.livesText.scrollFactorX = 0;
    this.livesText.scrollFactorY = 0;
  }

  increaseScore(type: string) {
    if (type === 'leaf') {
      this.score += 10;
      this.scoreText.setText(`Score: ${this.score}`);
      this.soundServise.playPickup1();
    }
    if (type === 'can') {
      this.score += 100;
      this.scoreText.setText(`Score: ${this.score}`);
      this.soundServise.playPickup2();
    }
    if (type === 'flower') {
      this.score += 30;
      this.scoreText.setText(`Score: ${this.score}`);
      this.soundServise.playPickup3();
    }
    if (type === 'healthCan') {
      this.player.increaseHP();
      this.livesText.setText(`${this.player.getHPValue()}`);
      this.soundServise.playHealthPickup();
    }
  }

  reduceLife() {
    this.livesText.setText(`${this.player.getHPValue()}`);
    this.soundServise.playHurtSwing();
  }

  createPlatforms(platformsKey: string, platformTs: string, platformMap: string, tileImg: string) {
    const map = this.make.tilemap({ key: platformsKey });
    const tileset = map.addTilesetImage(platformTs, tileImg, 32, 32);
    const platforms = map.createLayer(platformMap, tileset, 0, -1470);
    // // Dont forget to set collision to each tile in tiled!
    platforms.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.player, platforms, (obj1, obj2: ICollidedObject) => {
      if (obj2.properties?.noStick) {
        this.player.canStick = false;
      }
    });
    return map;
  }

  createPickups(map: Phaser.Tilemaps.Tilemap, type: string) {
    const objectPoints = gameObjectsToObjectPoints(
      map.filterObjects('EntityLayer', (obj) => obj.name === `${type}Point`)
    );
    const pickups = objectPoints.map((point) => this.physics.add.sprite(point.x, 450 - (1920 - point.y), `${type}Pickup`).setScale(1.5).setSize(16, 16));
    pickups.forEach((leaf) => {
      this.tweens.timeline({
        targets: leaf,
        loop: -1,
        yoyo: true,
        duration: 500,
        ease: 'Linear',
        tweens: [
          {
            y: leaf.y - 5,
          },
          {
            y: leaf.y + 5,
          },
          ],
      });
      this.physics.add.overlap(this.player, leaf, (obj1, obj2) => {
        obj2.destroy();
        this.increaseScore(type);
      });
    });
  }

  createEnergyPickup(map: Phaser.Tilemaps.Tilemap) {
    const energyCanPoint = gameObjectsToObjectPoints(
      map.filterObjects('EntityLayer', (obj) => obj.name === 'energyCanPoint')
    );
    const energyCan = this.physics.add.sprite(energyCanPoint[0].x - 20, 450 - (1920 - energyCanPoint[0].y) - 20, 'energyCanPickup')
    .setScale(1.5)
    .setImmovable(true);
    this.tweens.timeline({
      targets: energyCan,
      loop: -1,
      yoyo: true,
      duration: 500,
      ease: 'Linear',
      tweens: [
        {
          y: energyCan.y - 5,
        },
        {
          y: energyCan.y + 5,
        },
        ],
    });
    this.physics.add.overlap(this.player, energyCan, (obj1, obj2) => {
      const text = tutorialFlow.attack;
      const tutorialText = this.make.text(
        {
          x: 32,
          y: 116,
          text,
          style: {
            wordWrap: { width: +this.sys.game.config.width - 40 },
          },
        }
  );
      tutorialText.scrollFactorX = 0;
      tutorialText.scrollFactorY = 0;
      this.time.delayedCall(5000, () => {
        tutorialText.destroy();
      })
      this.soundServise.playKeyPickup();
      this.player.canAttack = true;
      obj2.destroy();
    });
  }



  createKey(map: Phaser.Tilemaps.Tilemap) {
    const keyPoint = gameObjectsToObjectPoints(
      map.filterObjects('FunctionalLayer', (obj) => obj.name === 'keyPoint')
    );

    const key = this.physics.add.sprite(keyPoint[0].x - 20, 450 - (1920 - keyPoint[0].y) - 20, 'keyPickup')
    .setScale(2)
    .setImmovable(true)
    .setBodySize(8, 17);
    this.tweens.timeline({
      targets: key,
      loop: -1,
      yoyo: true,
      duration: 500,
      ease: 'Linear',
      tweens: [
        {
          y: key.y - 5,
        },
        {
          y: key.y + 5,
        },
        ],
    });
    this.physics.add.overlap(this.player, key, (obj1, obj2) => {
      this.soundServise.playKeyPickup();
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
      this.soundServise.playDoorSound();
      this.saveScoreToSharedState();
      this.saveHPtoSharedState();
      // для того чтобы при смене уровня не потерять score и hp
      console.log('sharedState.score:', this.sharedState.score);
      console.log('sharedState.hp:', this.sharedState.playerHP);
      }
      this.player.collided = true;
    });
  }

  createDestructibleBarricade(map: Phaser.Tilemaps.Tilemap) {
    const destructibleBarricadePoints = gameObjectsToObjectPoints(
      map.filterObjects('FunctionalLayer', (obj) => obj.name === 'destructibleBarricadePoint')
    );
    const zoneArr: Phaser.GameObjects.Zone[] = [];

    const destructibleBarricades = destructibleBarricadePoints.map((point) => {
      const zone = this.add.zone(point.x, 450 - (1920 - point.y), 80, 64);
      this.physics.world.enable(zone);
      zoneArr.push(zone);
      return this.physics.add.sprite(point.x, 450 - (1920 - point.y), 'destructibleBarricade').setSize(55, 64).setImmovable(true);
    })
    destructibleBarricades.forEach((barricade) => {
      this.physics.add.collider(this.player, barricade);
    });

    zoneArr.forEach((zone, idx) => {
      this.physics.add.overlap(this.player, zone, (obj1, obj2) => {
        if (Phaser.Input.Keyboard.JustDown(this.keyR) && this.player.canAttack) {
          this.player.attacked = true;
          console.log('attack');
          this.tweens.add({
            targets: destructibleBarricades[idx],
            duration: 100,
            repeat: 3,
            yoyo: true,
            alpha: 0.5,
            onComplete: () => {
              zone.destroy();
              destructibleBarricades[idx].destroy();
              this.player.attacked = false;
            },
          });
        }
      });
    });
  }



  beginTransition(nextSceneKey: string, posX: number, posY: number) {
    this.player.diableKeys();
    this.sharedState.playerHP = String(this.player.getHPValue());
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
        if (!this.player.enemyOverlap) {
          this.player.enemyCollide = true;
          this.player.getDamage(1, !this.player.onWall);
          console.log(this.getPlayer().getHPValue());

          this.reduceLife();
          if (this.getPlayer().getHPValue() <= 0) {
            this.cameras.main.fadeOut(200, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
              this.scene.start('GameOverScene');
            });
          }
        }
        this.player.enemyOverlap = true;
      });
    });
    return enemies;
  }

  createInfoPoints(map: Phaser.Tilemaps.Tilemap) {
    const infoPoints = gameObjectsToObjectPoints(
      map.filterObjects('TutorialLayer', (obj) => obj.name === 'infoPoint')
    );

    const infoSigns = infoPoints.map((point) => this.physics.add.sprite(point.x, 450 - (1920 - point.y), 'infoSign').setSize(50, 59));
    infoSigns.forEach((sign, idx) => {
      this.physics.add.overlap(this.player, sign, () => {
        if (!this.player.collided) {
          this.playTutorial(infoPoints[idx].properties[0].value as string);
          this.player.collided = true;
        }
      });
    });
  }


  makeIntro() {
    const text = tutorialFlow.walk;
    const positionX = this.cameras.main.worldView.x + 32;
    const positionY = this.cameras.main.worldView.y + 80;
    const textGraphic = this.make.text({
      x: positionX,
      y: positionY,
      text,
    });
    this.tweens.add({
      targets: textGraphic,
      alpha: 1,
      duration: 300,
      ease: 'Power2',
    });
    this.time.delayedCall(3000, () => {
      this.tweens.add({
        targets: textGraphic,
        alpha: 0,
        duration: 300,
        ease: 'Power2',
        onComplete: () => {
          textGraphic.destroy();
          this.player.enableKeys();
        },
      });
    });
    textGraphic.scrollFactorX = 0;
    textGraphic.scrollFactorY = 0;
  }

  displayMapName(text: string) {
    const textGraphic = this.make.text({
      x: 300,
      y: 32,
      text,
      style: {
        fontSize: '32px',
        strokeThickness: 0.5,
      }
    });
    this.time.delayedCall(3000, () => {
      this.tweens.add({
        targets: textGraphic,
        alpha: 0,
        duration: 300,
        ease: 'Power2',
      });
    });
    textGraphic.scrollFactorX = 0;
    textGraphic.scrollFactorY = 0;
  }

  playTutorial(type: string) {
    const positionX = this.cameras.main.worldView.x + 32;
    const positionY = this.cameras.main.worldView.y + 48;
    const text = tutorialFlow[type as keyof ITutorialFlow];
    console.log(positionX, positionY);

    this.player.tutorialText = this.make.text(
      {
        x: 32,
        y: 116,
        text,
        style: {
          wordWrap: { width: +this.sys.game.config.width - 40 },
        },
      }
);
    this.player.tutorialText.scrollFactorX = 0;
    this.player.tutorialText.scrollFactorY = 0;
  }

  checkEsc() {
    if (Phaser.Input.Keyboard.JustDown(this.keyESC)) {
      if (!this.scene.isPaused()) {
        this.scene.launch('PauseMenuScene', { key: this.scene.key });
        this.scene.pause();
/*         this.sharedState.score = String(this.score);
        this.sharedState.playerHP = String(this.player.getHPValue());
        console.log('score: ', this.score);
        // для того чтобы из паузы можно было получить score и HP */

        this.sharedState.playableScenePaused = this.scene.key;
      }
    }
  }

  initServices(): void {
    this.soundServise = new SoundService( // @ts-ignore: Unreachable code error
      this.game.effectsAudioManager, // @ts-ignore: Unreachable code error
      this.game.musicAudioManager
      );
  }

  _loadPlayer() {
    this._spawnCharacters();
  }

  _spawnCharacters() {
    if (this.sharedState.playerHP) {
      this.player = new Player(this, 32, 300, +this.sharedState.playerHP);
    } else {
      this.player = new Player(this, 10000, 100, 3);
    }
    this._addPlayer();
  }

  _addPlayer() {
    this.add.existing(this.player);
  }

  _setCamera(worldWidth: number, worldHeight: number) {
    this.cameras.main.setBounds(0, -1470, worldWidth, worldHeight, true);
    this.physics.world.setBounds(0, -1470, worldWidth + 500, worldHeight + 64, true, true, true);
    this.cameras.main.startFollow(this.player, true, 0.5, 0.5, 0, 100);
  }

  _createBackground(name: string, x: number, y: number, width: number, height: number) {
    this.add.tileSprite(x, y, width, height, name).setOrigin(0);
  }

  getPlayer() {
    return this.player;
  }

  saveScoreToSharedState() {
    this.sharedState.score = String(this.score);
  }

  saveHPtoSharedState() {
    this.sharedState.playerHP = String(this.player.getHPValue());
  }

  saveSceneToSharedState(sceneKey: string) {
    this.sharedState.lastLevel = sceneKey;
  }

  saveScoreToLocalStorage() {
    this.saveScoreToSharedState();
    if (this.sharedState.score) saveToLocalStorage(SaveItems.score, this.sharedState.score);
  }

  saveHPtoLocalStorage() {
    this.saveHPtoSharedState();
    if (this.sharedState.playerHP) {
      saveToLocalStorage(SaveItems.playerHP, this.sharedState.playerHP);
    }
  }

  saveSceneToLocalStorage(sceneKey: string) {
    this.saveSceneToSharedState(sceneKey);
    if (this.sharedState.lastLevel) {
      saveToLocalStorage(SaveItems.lastLevel, this.sharedState.lastLevel);
    }
  }

  saveAllDataToSharedState(sceneKey: string) {
    this.saveScoreToSharedState();
    this.saveHPtoSharedState();
    this.saveSceneToSharedState(sceneKey);
    console.log('save all data to shared state');
  }

  saveAllDataToLocalStorage(sceneKey: string) {
    this.saveScoreToLocalStorage();
    this.saveHPtoLocalStorage();
    this.saveSceneToLocalStorage(sceneKey);
    console.log('saved all data to local storage');
  }
}

export default SceneBase;

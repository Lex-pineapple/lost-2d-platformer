import { IMenuItem, ISharedState } from '../../../../../types/interfaces';
import NonPlayableBaseScene from './nonPlayableBaseScene';
import { SaveItems, getFromLocalStorage } from '../../helpers/localStorage';
import { soundConfigMaster, soundConfigEffects, soundConfigMusic } from '../../audio/audioConfigs';
import { State } from '../../../../../app/state';
import { Loader } from '../../../../../app/loader';

class MainMenuScene extends NonPlayableBaseScene {
  private menu: IMenuItem[] = [
    {
      sceneKey: '',
      text: 'New Game',
      textGameObj: null,
      handleEvents: this.startNewGame.bind(this),
    },
    {
      sceneKey: '',
      text: 'Load Game',
      textGameObj: null,
      handleEvents: this.loadGameFromApi.bind(this),
    },

    { sceneKey: this.menuScenes.optionsMenu, text: 'Options', textGameObj: null },
  ];

  constructor(name: string, protected sharedState: ISharedState) {
    super('MainMenuScene', sharedState);
  }

  create() {
    super.create();
    this.makeBG();
    this.styleMenu(200);
    this.createTitle('Main Menu');
    this.createMenu(this, this.menu, 25);
    this.createFullscreenSwitch();

    this.soundServise.stopAnyMusic();
    this.loadVolumesFromApi();
  }

  makeBG() {
    this.add.image(0, 0, 'frontBG').setOrigin(0, 0);
    const catSprite = this.physics.add.sprite(700, 300, 'frontBGcatSprite');

    this.tweens.timeline({
      targets: catSprite.body.velocity,
      loop: -1,
      yoyo: true,
      ease: 'Power1',
      tweens: [
        {
          y: -50, duration: 400,
        },
        {
          y: 50, duration: 400,
        },
        ],
    });
  }

  startNewGame() {
    this.sharedState.score = String(0);
    this.sharedState.lastLevel = 'PlaySceneOne';
    this.sharedState.playerHP = String(3); // fix: 100 временная величина
    this.scene.start('PlaySceneOne');
  }

  loadVolumesFromLocalStorage() {
    const masterVolume = Number(getFromLocalStorage(SaveItems.masterVolume));
    const musicVolume = Number(getFromLocalStorage(SaveItems.musicVolume));
    const effectsVolume = Number(getFromLocalStorage(SaveItems.effectsVolume));

    if (masterVolume) soundConfigMaster.volume = masterVolume;
    if (musicVolume) this.soundServise.setVolumeMusic(musicVolume);
    if (effectsVolume) this.soundServise.setVolumeEffects(effectsVolume);
  }

  async loadVolumesFromApi() {
    if (!State.data.playerId) return;
    const playerStats = await Loader.getPlayer(State.data.playerId);
    if (playerStats) {
      soundConfigMaster.volume = playerStats.masterVolume;
      this.soundServise.setVolumeEffects(playerStats.effectsVolume);
      this.soundServise.setVolumeMusic(playerStats.musicVolume);
    }
  }

  loadGame() {
    const lastSceneKey = getFromLocalStorage(SaveItems.lastLevel);
    const score = getFromLocalStorage(SaveItems.score);
    const hp = getFromLocalStorage(SaveItems.playerHP);
    if (lastSceneKey && score && hp) {
      const coordinates = this.getSpawnCoordniates(lastSceneKey);
      this.sharedState.lastLevel = lastSceneKey;
      this.sharedState.score = score;
      this.sharedState.playerHP = hp;
      this.scene.start(
        lastSceneKey,
        {
          playerX: coordinates?.x,
          playerY: coordinates?.y,
          playerHP: hp,
        }
      );
    }
  }

  async loadGameFromApi() {
    if (!State.data.playerId) return;
    const playerStats = await Loader.getPlayer(State.data.playerId);
    if (playerStats) {
      const { lastLevel } = playerStats;
      let lastLevelStr = 'PlaySceneOne';
      if (lastLevel === 1) {
        lastLevelStr = 'PlaySceneOne';
      }
      if (lastLevel === 2) {
        lastLevelStr = 'PlaySceneTwo';
      }
      if (lastLevel === 3) {
        lastLevelStr = 'PlaySceneThree';
      }
      const coordinates = this.getSpawnCoordniates(lastLevelStr);
      this.sharedState.lastLevel = lastLevelStr;
      this.sharedState.score = String(playerStats.score);
      this.sharedState.playerHP = String(playerStats.livesLeft);
      this.scene.start(
        lastLevelStr,
        {
          playerX: coordinates?.x,
          playerY: coordinates?.y,
          playerHP: playerStats.livesLeft,
        }
      );
    }
  }

  update() {
    this.checkEsc();
  }
}

export default MainMenuScene;

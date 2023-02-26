import { IMenuItem, ISharedState } from '../../../../../types/interfaces';
import NonPlayableBaseScene from './nonPlayableBaseScene';
import { SaveItems, getFromLocalStorage } from '../../helpers/localStorage';
import { soundConfigMaster, soundConfigEffects, soundConfigMusic } from '../../audio/audioConfigs';

class MainMenuScene extends NonPlayableBaseScene {
  private menu: IMenuItem[] = [
    { sceneKey: 'PlaySceneOne', text: 'Start Game', textGameObj: null },
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
      handleEvents: this.loadGame.bind(this),
    },

    { sceneKey: this.menuScenes.optionsMenu, text: 'Options', textGameObj: null },
    // {
    //   sceneKey: 'ScoreScene',
    //   text: 'Score',
    //   textGameObj: null,
    //   handleEvents: this.handleMenuItemEvents.bind(this)
    // },
    // {
    //   sceneKey: null,
    //   text: 'Authors',
    //   textGameObj: null,
    //   handleEvents: this.handleMenuItemEvents.bind(this)
    // },
    // {
    //   sceneKey: 'MainMenuScene',
    //   text: 'Exit',
    //   textGameObj: null,
    //   handleEvents: this.handleMenuItemEvents.bind(this)
    // },
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
    this.soundServise.stopAnyMusic();
    this.loadVolumesFromLocalStorage();
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
    this.sharedState.hp = String(100);
    this.scene.start('PlaySceneOne');
  }

  loadVolumesFromLocalStorage() {
    const masterVolume = Number(getFromLocalStorage(SaveItems.masterVolume));
    const musicVolume = Number(getFromLocalStorage(SaveItems.musicVolume));
    const effectsVolume = Number(getFromLocalStorage(SaveItems.effectsVolume));

    if (masterVolume) soundConfigMaster.volume = masterVolume;
    if (musicVolume) this.soundServise.setVolumeMusic(musicVolume);
    if (effectsVolume) this.soundServise.setVolumeEffects(effectsVolume);
    console.log(soundConfigEffects.volume);
  }

  loadGame() {
    const lastSceneKey = getFromLocalStorage(SaveItems.lastLevel);
    const score = getFromLocalStorage(SaveItems.score);
    const hp = getFromLocalStorage(SaveItems.healthPoint);
    if (lastSceneKey && score && hp) {
      this.sharedState.lastLevel = lastSceneKey;
      this.sharedState.score = score;
      this.sharedState.hp = hp;
      // this.scene.stop('MainMenuScene');
      this.scene.start(lastSceneKey);
      console.log(lastSceneKey);
    }
  }

  update() {
    this.checkEsc();
  }
}

export default MainMenuScene;

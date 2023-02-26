import { IMenuItem, ISharedState } from '../../../../../types/interfaces';
import NonPlayableBaseScene from './nonPlayableBaseScene';
import { saveToLocalStorage, SaveItems } from '../../helpers/localStorage';

class PauseMenuScene extends NonPlayableBaseScene {
  private menu: IMenuItem[] = [
    {
      sceneKey: () => this.sharedState.playableScenePaused,
      text: 'Resume',
      textGameObj: null,
      handleEvents: this.resumeGame.bind(this),
    },
    {
      sceneKey: null,
      text: 'Save',
      textGameObj: null,
      handleEvents: this.saveButtonEvent.bind(this),
    },
    {
      sceneKey: this.menuScenes.optionsMenu,
      text: 'Options',
      textGameObj: null,
      handleEvents: this.openOptionsMenu.bind(this),
    },
    {
      sceneKey: this.menuScenes.optionsMenu,
      text: 'Quit',
      textGameObj: null,
      handleEvents: this.backToMainMenu.bind(this),
    },
  ];

  constructor(name: string, protected sharedState: ISharedState) {
    super('PauseMenuScene', sharedState);
  }

  // private previousScene!: string;
  // init(data: IInitScene) {
  //   this.previousScene = data.key;
  //   this.menu[0].sceneKey = this.previousScene;
  // }

  create() {
    super.create();
    this.styleMenu(200);
    this.createTitle('Pasued');
    this.createMenu(this, this.menu, 100);
    this.createFullscreenSwitch();
  }

  update() {
    this.checkEsc();
  }

  resumeGame() {
    this.scene.stop();

    if (this.sharedState.playableScenePaused) {
      this.scene.resume(this.sharedState.playableScenePaused);
      this.sharedState.playableScenePaused = null;
    }
  }

  backToMainMenu() {
    if (this.sharedState.playableScenePaused) {
      this.scene.stop(this.sharedState.playableScenePaused);
      this.sharedState.playableScenePaused = null;
    }
    if (this.sharedState.score) this.sharedState.score = String(0);
    this.sharedState.playerHP = String(0); // ?????
    this.sharedState.lastLevel = 'PlaySceneOne';
    this.scene.start('MainMenuScene');
  }

  openOptionsMenu() {
    this.scene.stop('PauseMenuScene');
    this.scene.start('OptionsScene');
    this.scene.bringToTop('OptionsScene');
  }

  saveButtonEvent() {
    if (this.sharedState.score) {
      saveToLocalStorage(SaveItems.score, this.sharedState.score);
    }
    if (this.sharedState.playerHP) {
      saveToLocalStorage(SaveItems.playerHP, this.sharedState.playerHP);
    }
    if (this.sharedState.lastLevel) {
      saveToLocalStorage(SaveItems.lastLevel, this.sharedState.lastLevel);
    }
    console.log('create save');
  }
}

export default PauseMenuScene;

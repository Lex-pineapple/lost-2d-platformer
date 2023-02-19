import { IMenuItem, ISharedState } from '../../../../../types/interfaces';
import NonPlayableBaseScene from './nonPlayableBaseScene';

class MainMenuScene extends NonPlayableBaseScene {
  private menu: IMenuItem[] = [
    { sceneKey: 'PlaySceneOne', text: 'Start Game', textGameObj: null },
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
    this.createTitle();
    this.createMenu(this, this.menu, 25);
    this.soundServise.stopAnyMusic();
  }

  createTitle() {
    this.add.text(15, 10, 'Main Menu', { color: '#ffffff' });
  }

  update() {
    this.checkEsc();
  }
}

export default MainMenuScene;

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
    this.makeBG();
    this.styleMenu(200);
    this.createTitle('Main Menu');
    this.createMenu(this, this.menu, 25);
    this.soundServise.stopAnyMusic();
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
        }
        ],
    });
  }

  update() {
    this.checkEsc();
  }
}

export default MainMenuScene;

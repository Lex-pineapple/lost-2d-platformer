import { IMenuItem, ISharedState } from '../../../../../types/interfaces';
import NonPlayableBaseScene from './nonPlayableBaseScene';

class GameOverScene extends NonPlayableBaseScene {
  private previousScene!: string;

  private menu: IMenuItem[] = [
    { sceneKey: 'PlaySceneOne', text: 'Restart', textGameObj: null },
    {
      sceneKey: 'MainMenuScene',
      text: 'Main Menu',
      textGameObj: null,
      handleEvents: this.returnToMainMenu.bind(this),
    },
  ];

  constructor(name: string, protected sharedState: ISharedState) {
    super('GameOverScene', sharedState);
  }

  // init(data: IInitScene) {
  //   this.previousScene = data.key;
  // }

  create() {
    this.cameras.main.fadeIn(1000, 0, 0, 0);
    super.create();
    this.add.image(this.getMiddlePositionX(), this.getMiddlePositionY(), 'gameOverBackground');
    this.add.sprite(this.getMiddlePositionX(), this.getMiddlePositionY() + 75, 'gameOverSprite');
    // this.createTitle();
    this.createMenu(this, this.menu, 150);
    this.createFullscreenSwitch();

    this.soundServise.playGameOverMusic();
  }

  createTitle() {
    this.add
      .text(this.getMiddlePositionX(), this.getMiddlePositionY(), 'Game Over', {
        fontSize: '48px',
        color: '#ffffff',
      })
      .setOrigin(0.5);
  }
}

export default GameOverScene;

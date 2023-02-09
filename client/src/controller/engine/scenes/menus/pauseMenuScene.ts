import { Scene } from 'phaser';
import BaseMenu from './baseMenu';
import Button from '../../helpers/button';
import PauseManager from '../../helpers/pauseManager';

class PauseMenu extends BaseMenu {
  private previousScene!: string;

  backToMainMenu = () => {
    this.scene.stop(this.previousScene);
    this.scene.start('MainMenuScene');
  };

  openOptionsMenu = () => {
    this.scene.stop('PauseMenuScene');
    this.scene.start('OptionsScene', { key: 'PauseMenuScene' });
    this.scene.bringToTop('OptionsScene');
  };

  constructor() {
    super('PauseMenuScene');
  }

  init(data: IInitScene) {
    this.previousScene = data.key;
  }

  create() {
    const xAxis = this.getMiddlePositionX();
    const yAxis = this.getMiddlePositionY();
    const pauseLabel = this.add.text(xAxis, 25, 'Pause').setOrigin(0.5);

    const resumeButton = new Button(xAxis, yAxis - 100, 'Resume', this, () => {
      this.scene.stop();
      this.scene.resume(PauseManager.sceneBeforePause);
    });
    const saveButton = new Button(xAxis, yAxis - 50, 'Save', this, () => null);
    const loadButton = new Button(xAxis, yAxis, 'Load', this, () => null);
    const optionsButton = new Button(xAxis, yAxis + 50, 'Options', this, this.openOptionsMenu);
    const exitButton = new Button(xAxis, yAxis + 100, 'Quit', this, this.backToMainMenu);
    this.addEscEvent(PauseManager.sceneBeforePause.scene.key); // fix it
  }
}

export default PauseMenu;

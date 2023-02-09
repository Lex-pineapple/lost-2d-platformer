import { Scene } from 'phaser';
import Button from '../../helpers/button';
import PauseManager from '../../helpers/pauseManager';
import EscapeHandler from '../../helpers/escHandler';

class PauseMenu extends Scene {
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
    const xAxis = this.cameras.main.width / 2;
    const yAxis = this.cameras.main.height / 2;
    const pauseLabel = this.add.text(xAxis, 25, 'Pause').setOrigin(0.5);

    const resumeButton = new Button(xAxis, yAxis - 100, 'Resume', this, () => {
      this.scene.stop();
      this.scene.resume(PauseManager.sceneBeforePause);
      // PauseManager.switchPause(this.scene.scene);
    });
    const saveButton = new Button(xAxis, yAxis - 50, 'Save', this, () => null);
    const loadButton = new Button(xAxis, yAxis, 'Load', this, () => null);
    const optionsButton = new Button(xAxis, yAxis + 50, 'Options', this, this.openOptionsMenu);
    const exitButton = new Button(xAxis, yAxis + 100, 'Quit', this, this.backToMainMenu);
    const escHandler = new EscapeHandler(this);
    escHandler.addEscEvent(PauseManager.sceneBeforePause.scene.key);
  }
}

export default PauseMenu;

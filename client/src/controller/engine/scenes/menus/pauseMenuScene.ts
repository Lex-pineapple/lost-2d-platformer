import { Scene } from 'phaser';
import Button from '../../helpers/button';
import PauseManager from '../../helpers/pauseManager';

class PauseMenu extends Scene {
  private previousScene!: string;

  backToMainMenu = () => {
    this.scene.stop(this.previousScene);
    this.scene.start('MainMenuScene');
  };

  openOptionsMenu = () => {
    // this.scene.stop('PauseMenuScene');
    this.scene.setVisible(false, 'PauseMenuScene');
    this.scene.launch('OptionsScene', { key: 'PauseMenuScene' });
    // fix. сцена не становится видима
  };

  constructor() {
    super('PauseMenuScene');
  }

  init(data: IInitScene) {
    this.previousScene = data.key;
    console.log(this.previousScene);
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
    this.input.keyboard.on('keydown', (event: KeyboardEventInit) => {
      if (event.key === 'Escape') {
        this.scene.stop();
        this.scene.resume(PauseManager.sceneBeforePause);
      }
    });
  }
}

export default PauseMenu;

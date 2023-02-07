import { Scene } from 'phaser';
import Button from '../../helpers/button';

class PauseMenu extends Scene {
  constructor() {
    super('PauseMenuScene');
  }

  create() {
    const xAxis = this.cameras.main.width / 2;
    const yAxis = this.cameras.main.height / 2;
    const pauseLabel = this.add.text(xAxis, 25, 'Pause').setOrigin(0.5);

    const resumeButton = new Button(xAxis, 150, 'Resume', this, () => {
      console.log(this);
      this.scene.stop();
      this.scene.resume('PlaySceneOne');
    });
    this.input.keyboard.on('keydown', (event: KeyboardEventInit) => {
      if (event.key === 'Escape') {
        this.scene.stop();
        this.scene.resume('PlaySceneOne');

        console.log('esc from pause');
      }
    });
  }
}

export default PauseMenu;

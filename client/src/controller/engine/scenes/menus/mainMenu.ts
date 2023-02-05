import { Scene } from 'phaser';
import Button from '../../helpers/button';

class MainMenuScene extends Scene {
  startGame = () => {
    this.scene.start('PlaySceneOne');
  };

  openOptions = () => {
    this.scene.start('OptionsScene');
  };

  constructor() {
    super('MainMenuScene');
  }

  create() {
    const xAxis = this.cameras.main.width / 2;
    const yAxis = this.cameras.main.height / 2;
    const text = this.add.text(15, 10, 'Main Menu', { color: '#ffffff' });
    const startButton = new Button(xAxis, yAxis - 25, 'Start Game', this, this.startGame);
    const optionsButton = new Button(xAxis, yAxis + 25, 'Options', this, this.openOptions);
    const authorsButton = new Button(xAxis, yAxis + 75, 'Authors', this, () => 'authors');
  }
}

export default MainMenuScene;

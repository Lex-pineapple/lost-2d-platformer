import { Scene } from 'phaser';
import BaseMenu from './baseMenu';
import Button from '../../helpers/button';

class GameOverScene extends BaseMenu {
  private previousScene!: string;

  constructor() {
    super('GameOverScene');
  }

  /*   init(data: IInitScene) {
    this.previousScene = data.key;
  } */

  create() {
    const xAxis = this.cameras.main.width / 2;
    const yAxis = this.cameras.main.height / 2;
    const labelGameOver = this.add.text(xAxis, yAxis - 100, 'Game Over', { fontSize: '26px' }).setOrigin(0.5);
    const restartButton = new Button(xAxis - 150, yAxis, 'Restart', this, () => null);
    const mainMenuButton = new Button(xAxis + 150, yAxis, 'Main Menu', this, () => {
      this.scene.start('MainMenuScene');
    });
  }
}

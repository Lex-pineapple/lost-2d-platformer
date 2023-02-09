import { Scene } from 'phaser';

class BaseMenu extends Scene {
  protected lastSceneKey: string | undefined;

  protected sceneBeforePause: Scene | undefined;

  protected menuScenes: IMenuScenes = {
    mainMenu: 'MainMenuScene',
    optionsMenu: 'OptionsScene',
    pauseMenu: 'PauseMenuScene',
  };

  constructor(name: string) {
    super({ key: name });
  }

  getMiddlePositionX() {
    return this.cameras.main.width / 2;
  }

  getMiddlePositionY() {
    return this.cameras.main.height / 2;
  }

  // пока не используется, может и не нужен
  // для вызова паузы все равно нужна внешняя функция
  switchPause(sceneForPause: Scene) {
    if (!sceneForPause.scene.isPaused()) {
      const keyScene = sceneForPause.scene.key;
      if (keyScene === this.menuScenes.optionsMenu) {
        sceneForPause.scene.stop();
        sceneForPause.scene.resume(this.menuScenes.pauseMenu);
      } else {
        this.sceneBeforePause = sceneForPause;
        sceneForPause.scene.launch(this.menuScenes.pauseMenu, { key: sceneForPause.scene.key });
        sceneForPause.scene.pause();
      }
    }
  }

  addEscEvent(sceneToReturn: string) {
    this.scene.scene.input.keyboard.on('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (sceneToReturn === 'MainMenuScene') {
          this.scene.stop();
          this.scene.start('MainMenuScene');
        } else if (sceneToReturn === 'PlaySceneOne') {
          this.scene.stop();
          this.scene.resume(sceneToReturn);
          // костыль. этот блок нужен для того чтобы возвращать из паузы сцену с игрой
          // в сравнении нужно доавить все сцены и проверять что sceneToReturn является сценой игры
        } else {
          this.scene.stop();
          this.scene.start(sceneToReturn);
        }
      }
    });
  }
}

export default BaseMenu;

import { Scene } from 'phaser';

class EscapeHandler {
  private _scene: Scene;

  constructor(scene: Scene) {
    this._scene = scene;
  }

  addEscEvent(sceneToReturn: string) {
    this._scene.input.keyboard.on('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (sceneToReturn === 'MainMenuScene') {
          this._scene.scene.stop();
          this._scene.scene.start('MainMenuScene');
        } else if (sceneToReturn === 'PlaySceneOne') {
          this._scene.scene.stop();
          this._scene.scene.resume(sceneToReturn);
          // костыль. этот блок нужен для того чтобы возвращать из паузы сцену с игрой
          // в сравнении нужно доавить все сцены и проверять что sceneToReturn является сценой игры
        } else {
          this._scene.scene.stop();
          this._scene.scene.start(sceneToReturn);
        }
      }
    });
  }
}

export default EscapeHandler;

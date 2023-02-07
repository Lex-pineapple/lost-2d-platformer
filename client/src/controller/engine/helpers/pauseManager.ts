import { Scene, Scenes } from 'phaser';

class PauseManager {
  // private _currentScene: Scene;
  static sceneBeforePause: Scene;

  static _pauseSceneKey: string = 'PauseMenuScene';

  static whereToReturnFromOptions: string = 'MainMenuScene';

  static switchPause(scene: Scene) {
    PauseManager.whereToReturnFromOptions = 'MainMenuScene';
    // console.log(PauseManager.sceneBeforePause);

    // if (Scenes.SceneManager)
    console.log(scene.game.scene.getScene('PauseMenuScene'));
    if (!scene.scene.isPaused()) {
      PauseManager.sceneBeforePause = scene;
      scene.scene.launch(PauseManager._pauseSceneKey);
      // scene.scene.pause();
      scene.scene.setActive(false);
      PauseManager.whereToReturnFromOptions = 'PauseMenuScene';
    } else if (PauseManager.sceneBeforePause) {
      scene.scene.stop();
      scene.scene.resume(PauseManager.sceneBeforePause);
    }

    console.log(scene.game.scene.isVisible('PauseMenuScene'));
    console.log(scene.game.scene.isVisible('PlaySceneOne'));
  }
}

export default PauseManager;

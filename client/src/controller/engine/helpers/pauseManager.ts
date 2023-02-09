import { Scene } from 'phaser';

class PauseManager {
  // private _currentScene: Scene;
  static sceneBeforePause: Scene;

  static pauseSceneKey: string = 'PauseMenuScene';

  static optionsMenuSceneKey: string = 'OptionsScene';

  static mainMenuSceneKey: string = 'MainMenuScene';

  static switchPause(scene: Scene) {
    if (!scene.scene.isPaused()) {
      const keyScene = scene.scene.key;
      if (keyScene === PauseManager.optionsMenuSceneKey) {
        scene.scene.stop();
        scene.scene.resume(PauseManager.pauseSceneKey);
      } else {
        PauseManager.sceneBeforePause = scene;
        scene.scene.launch(PauseManager.pauseSceneKey, { key: scene.scene.key });
        scene.scene.pause();
      }
    }
  }
}

export default PauseManager;

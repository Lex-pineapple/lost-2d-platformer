import { Scene } from 'phaser';

class PauseManager {
  private _currentScene: Scene;

  private _pauseSceneKey: string;

  private _isPaused: boolean;

  constructor(currentScene: Scene) {
    this._currentScene = currentScene;
    this._isPaused = false;
    this._pauseSceneKey = 'PauseMenuScene';
    console.log(this._currentScene);
  }

  switchPause() {
    if (!this._currentScene.scene.isPaused()) {
      console.log('switch');
      this._currentScene.scene.launch(this._pauseSceneKey);
      this._currentScene.scene.pause();
      this._isPaused = true;
      console.log('first', this._currentScene.scene.isPaused());
    }
  }
}

export default PauseManager;

import { IPlayerPosition, ISharedState } from '../../types/interfaces';
import SceneBase from './sceneBase';

class PlaySceneThree extends SceneBase {
  private playerX: number | null = null;

  private playerY: number | null = null;

  constructor(name: string, protected sharedState: ISharedState) {
    super('PlaySceneThree', sharedState);
  }

  init(data: IPlayerPosition) {
    this.playerX = data.playerX;
    this.playerY = data.playerY;
  }

  create() {
    super.create();
    const worldSize = 11000;
    const BGHeight = 1920;
    this.cameras.main.fadeIn(1000, 0, 0, 0);
    this.tileBackgrounds(BGHeight);
    // this.createEndpoint(worldSize, 0);
    this._loadPlayer();
    // if (this.playerX !== null) this.getPlayer().x = this.playerX;
    // if (this.playerY !== null) this.getPlayer().y = this.playerY;
    this._setCamera(worldSize, BGHeight);
    this.createPlatforms(
      'dark-peacefulForestTileMap',
      'dark-peacefulTileset',
      'dark-peacefulMap',
      'dark-peacefulForestTiles', // eslint-disable-line
    );
    // this.addEndpointHandler('PlaySceneNext', 0, 420);
  }

  tileBackgrounds(BGHeight: number) {
    const gameWidth = +this.game.config.width;
    const gameHeight = +this.game.config.height;
    this._createBackground('demonForestBG1', 0, gameHeight - BGHeight, 1164);
    this._createBackground('demonForestBG2', 1164, gameHeight - BGHeight, 2298);
    this._createBackground('demonForestBG3', 1164 + 2298, gameHeight - BGHeight, 1000);
    this._createBackground('demonForestBG4', 1164 + 2298 + 1000, gameHeight - BGHeight, 1000);
    this._createBackground(
      'demonForest-peaceful-skyTransition',
      1164 + 2298 + 1000 + 1000,
      gameHeight - BGHeight,
      5000
    );
    this._createBackground('peacefulBG1', 1164 + 2298 + 1000 + 5000, gameHeight - BGHeight, 1346);
    this._createBackground(
      'peacefulBG2',
      1164 + 2298 + 1000 + 5000 + 1346,
      gameHeight - BGHeight,
      1174
    );
  }

  update(): void {
    this.checkEsc();
    this.getPlayer().update();
  }
}

export default PlaySceneThree;

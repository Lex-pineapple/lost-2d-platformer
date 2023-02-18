// import { Loader } from '../../app/loader';
// import { State, StateData } from '../../app/state';
// import { ElementPosition } from '../../app/types';
// import Utils from '../../app/utils';
// import Component from '../_/component';

import * as Phaser from 'phaser';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';
import LoadingScene from './controller/scenes/loading';
import MainMenuScene from './controller/scenes/non-playable/mainMenuScene';
import OptionsScene from './controller/scenes/non-playable/optionsScene';
import PlaySceneOne from './controller/scenes/scene1Forest';
import PlaySceneTwo from './controller/scenes/scene2Caverns';
import PlaySceneThree from './controller/scenes/scene3DarkWoods';
import PauseMenuScene from './controller/scenes/non-playable/pauseMenuScene';
import GameOverScene from './controller/scenes/non-playable/gameOverScene';
import { ISharedState } from '../../types/interfaces';
import Component from '../_/component';
import Utils from '../../app/utils';
import { ElementPosition } from '../../app/types';

class Game extends Component {
  protected content: HTMLElement;

  private gameEl: HTMLElement;

  private gameBoxEl: HTMLElement;

  private game: Phaser.Game | null = null;

  constructor() {
    super();
    this.gameEl = Utils.createEl('section', ['page__game', 'game']);
    this.gameBoxEl = Utils.createEl('div', ['game__box', 'game-box']);
    this.content = this.build();
    this.init();
  }

  build() {
    const gameContainerEl = Utils.createEl('div', ['game__container', 'container', 'js-game-container']);
    const gameHeadlineEl = Utils.createEl('h2', ['game__headline'], 'Lost Cat Adventure');
    const gameColsEl = Utils.createEl('div', ['game__cols']);
    const gameColOneEl = Utils.createEl('div', ['game__col', 'game__col--one']);
    gameContainerEl.append(gameHeadlineEl);
    gameContainerEl.append(gameColsEl);
    gameColsEl.append(gameColOneEl);
    gameColOneEl.append(this.gameBoxEl);
    const gameColTwoEl = Utils.createEl('div', ['game__col', 'game__col--two']);
    gameColsEl.append(gameColTwoEl);

    const htmlProlog = `
      <!-- <h2 class="game__headline">Lost Cat Adventure</h2> -->

      <p>Whiskers loves to explore the world around him. One day, while out on a walk, he became distracted by a butterfly and chased it deep into the forest. When he finally catched the butterfly, he realized that he has wandered too far from home and is lost.

      <p>As he tries to find his way back, Whiskers notices a familiar scent — cat mint! He follows the scent trail, picking up sprigs of the fragrant plant along the way, hoping it will lead him home. Whiskers must now navigate through the forest, avoiding enemies, and find his way back home. Along the way, he meets other animals who offer the help.</p>
    `;

    const htmlEpilogue = `
      <p>As Whiskers makes his way through, he discovers clues that lead him closer to home. However, he must also solve puzzles and overcome obstacles.</p>

      <p>As he gets closer to home, he realizes that he has become a stronger and braver cat, and that he is capable of anything he sets his mind to.</p>

      <p>The game is a fun and heartwarming adventure that highlights the resilience and determination of our feline friends.</p>
    `;

    gameColTwoEl.insertAdjacentHTML(ElementPosition.BEFORE_END, htmlProlog);

    const gameEpilogueEl = Utils.createEl('div', ['game__epilogue']);
    gameEpilogueEl.insertAdjacentHTML(ElementPosition.BEFORE_END, htmlEpilogue);

    gameContainerEl.append(gameEpilogueEl);

    this.gameEl.append(gameContainerEl);

    return this.gameEl;
  }

  init() {
    const SHARED_STATE: ISharedState = {
      playableScenePaused: null,
    };

    const scenes = [
      { Cls: LoadingScene, key: 'LoadingScene' },
      { Cls: PlaySceneOne, key: 'PlaySceneOne' },
      { Cls: PlaySceneTwo, key: 'PlaySceneTwo' },
      { Cls: PlaySceneThree, key: 'PlaySceneThree' },
      { Cls: MainMenuScene, key: 'MainMenuScene' },
      { Cls: OptionsScene, key: 'OptionsScene' },
      { Cls: PauseMenuScene, key: 'PauseMenuScene' },
      { Cls: GameOverScene, key: 'GameOverScene' },
    ];

    const initScenes = () => scenes.map((Scene) => new Scene.Cls(Scene.key, SHARED_STATE));

    const config: Phaser.Types.Core.GameConfig = {
      title: 'Lost',
      type: Phaser.WEBGL,
      parent: this.gameBoxEl,
      // scale: {
      //   mode: Phaser.Scale.ScaleModes.NONE,
      //   width: window.innerWidth,
      //   height: window.innerHeight,
      // },
      physics: {
        default: 'arcade',
        arcade: {
          // gravity: { y: 1400 },
          debug: true,
        },
      },
      plugins: {
        scene: [
          {
            key: 'rexUI',
            plugin: RexUIPlugin,
            mapping: 'rexUI',
          },
        ],
      },
      render: {
        antialiasGL: false,
        pixelArt: true,
      },
      // canvasStyle: `display: block; width: 100%; height: 100%`,
      autoFocus: true,
      audio: {
        disableWebAudio: true,
      },
      callbacks: {
        preBoot(game) {
          // @ts-ignore
          game.effectsAudioManager = Phaser.Sound.SoundManagerCreator.create(game); // eslint-disable-line
          // @ts-ignore
          game.musicAudioManager = Phaser.Sound.SoundManagerCreator.create(game); // eslint-disable-line
        },
      },

      // callbacks: {
      //   postBoot: () => {
      //     window.sizeChanged();
      //   }
      // }
      width: 800,
      height: 450,
      scene: initScenes(),
    };

    // window.sizeChanged = () => {
    //   if (window.game.isBooted) {
    //     setTimeout(() => {
    //       window.game.scale.resize(window.innerWidth, window.innerHeight);
    //       window.game.canvas.setAttribute(
    //         'style',
    //         `display: block; width: ${window.innerWidth}px; height: ${window.innerHeight}px;`,
    //       );
    //     }, 100);
    //   }
    // };
    // window.onresize = () => window.sizeChanged();

    // window.onload = function onWindowLoad() {
      this.game = new Phaser.Game(config);
    // };
  }

  destroyGame() {
    if (this.game) this.game.destroy(true);
  }
}

export default Game;

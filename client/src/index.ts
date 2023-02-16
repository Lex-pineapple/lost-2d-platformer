import * as Phaser from 'phaser';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';
import LoadingScene from './controller/scenes/loading';
import MainMenuScene from './controller/scenes/non-playable/mainMenuScene';
import OptionsScene from './controller/scenes/non-playable/optionsScene';
import PlaySceneOne from './controller/scenes/scene1Forest';
import PlaySceneTwo from './controller/scenes/scene2Caverns';
import PlaySceneThree from './controller/scenes/scene3DarkWoods';
import PauseMenuScene from './controller/scenes/non-playable/pauseMenuScene';
import { ISharedState } from './types/interfaces';
import GameOverScene from './controller/scenes/non-playable/gameOverScene';

// import './style.scss';
// import './assets/images/favicon.ico';

const SHARED_STATE: ISharedState = {
  playableScenePaused: null,
  playerHP: '3',
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

window.onload = function onWindowLoad() {
  const game = new Phaser.Game(config);
};

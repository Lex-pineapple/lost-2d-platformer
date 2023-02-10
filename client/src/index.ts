import * as Phaser from 'phaser';
import LoadingScene from './controller/engine/scenes/loading';
import PlaySceneOne from './controller/engine/scenes/scene1Forest';
import PlaySceneTwo from './controller/engine/scenes/scene2Caverns';
import PlaySceneThree from './controller/engine/scenes/scene3darkWoods';
// import './style.scss';
// import './assets/images/favicon.ico';

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
  render: {
    antialiasGL: false,
    pixelArt: true,
  },
  // canvasStyle: `display: block; width: 100%; height: 100%`,
  autoFocus: true,

  // callbacks: {
  //   postBoot: () => {
  //     window.sizeChanged();
  //   }
  // }
  width: 800,
  height: 450,
  scene: [LoadingScene, PlaySceneOne, PlaySceneTwo, PlaySceneThree],
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

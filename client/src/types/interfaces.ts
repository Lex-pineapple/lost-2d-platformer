interface ISharedState {
  [key: string]: string | null;
}
interface IJSONData {
  platforms: IPlatformData[];
}

interface IPlatformData {
  image: string;
  x: number;
  y: number;
}

interface IInitScene {
  key: string;
}

interface IMenuScenes {
  mainMenu: string;
  optionsMenu: string;
  pauseMenu: string;
}

interface IMenuItem {
  sceneKey: string | null | (() => string | null);
  text: string;
  textGameObj: Phaser.GameObjects.Text | null;
  handleEvents?: (menuItem?: IMenuItem) => void;
}

interface IPlayerPosition {
  playerX: number;
  playerY: number;
}

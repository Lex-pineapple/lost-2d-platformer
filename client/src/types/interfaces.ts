export interface ISharedState {
  [key: string]: string | null;
}
export interface IJSONData {
  platforms: IPlatformData[];
}

export interface IPlatformData {
  image: string;
  x: number;
  y: number;
}

export interface IInitScene {
  key: string;
}

export interface IMenuScenes {
  mainMenu: string;
  optionsMenu: string;
  pauseMenu: string;
}

export interface IMenuItem {
  sceneKey: string | null | (() => string | null);
  text: string;
  textGameObj: Phaser.GameObjects.Text | null;
  handleEvents?: (menuItem?: IMenuItem) => void;
}

export type ObjectPoint = {
  properties: IProperty[];
  height: number;
  id: number;
  name: string;
  point: boolean;
  rotation: number;
  type: string;
  visible: boolean;
  width: number;
  x: number;
  y: number;
};

export interface IProperty {
  name: string;
  type: string;
  value: string | boolean;
}

export interface IPlayerPosition {
  playerX: number;
  playerY: number;
}

export interface ITutorialFlow {
  walk: string;
  jump: string;
  stick: string;
  enemy: string;
  dialog: string;
}

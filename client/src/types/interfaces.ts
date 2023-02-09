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

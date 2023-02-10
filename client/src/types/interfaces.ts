interface IJSONData {
  platforms: IPlatformData[];
}

interface IPlatformData {
  image: string;
  x: number;
  y: number;
}

export type ObjectPoint = {
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
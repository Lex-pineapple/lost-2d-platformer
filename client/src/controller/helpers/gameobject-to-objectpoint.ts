import { ObjectPoint } from '../../types/interfaces';

export default function gameObjectsToObjectPoints(gameObjects: unknown[]): ObjectPoint[] {
  return gameObjects.map((gameObject) => gameObject as ObjectPoint);
}

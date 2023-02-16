import NonPlayableBaseScene from './nonPlayableBaseScene';
import { ISharedState } from '../../../types/interfaces';

class WinnerScene extends NonPlayableBaseScene {
  constructor(name: string, protected sharedState: ISharedState) {
    super('WinnerScene', sharedState);
  }

  create() {
    const xAxis = this.getMiddlePositionX();
    const yAxis = this.getMiddlePositionY();

    this.add.sprite(xAxis, yAxis - 75, 'goldenCup');
    this.add.sprite(xAxis, yAxis + 75, 'winMessage').setScale(0.5);
  }
}

export default WinnerScene;

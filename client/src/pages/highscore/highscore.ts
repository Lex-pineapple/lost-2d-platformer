import { ElementPosition } from '../../app/types';
import Highscore from '../../components/highscore/highscore';
import Page from '../_/page';

class HighscorePage extends Page {
  private highscore: Highscore;

  constructor() {
    super();

    this.highscore = new Highscore();
    this.highscore.render(this.container, ElementPosition.BEFORE_END);
  }
}

export default HighscorePage;

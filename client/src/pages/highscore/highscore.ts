import { ElementPosition } from '../../app/types';
import Highscores from '../../components/highscores/highscores';
import Page from '../_/page';

class HighscorePage extends Page {
  private highscores: Highscores;

  constructor() {
    super();

    this.highscores = new Highscores();
    this.highscores.render(this.container, ElementPosition.BEFORE_END);
  }
}

export default HighscorePage;

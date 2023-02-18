import { ElementPosition } from '../../app/types';
import Utils from '../../app/utils';
import Game from '../../components/game/game';
import Page from '../_/page';

class GamePage extends Page {
  private game: Game;

  constructor() {
    super();

    // this.container.append(gameBoxEl);
    // this.game = new Game(gameBoxEl);

    this.game = new Game();
    this.game.render(this.container, ElementPosition.BEFORE_END);
  }
}

export default GamePage;

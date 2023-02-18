import { ElementPosition } from '../../app/types';
import Utils from '../../app/utils';
import Game from '../../components/game/game';
import Page from '../_/page';

class GamePage extends Page {
  private game: Game;

  constructor() {
    super();

    this.game = new Game();
    this.game.render(this.container, ElementPosition.BEFORE_END);
  }

  destroyGame() {
    this.game.destroyGame();
  }
}

export default GamePage;

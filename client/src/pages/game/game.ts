import { ElementPosition } from '../../app/types';
import { State } from '../../app/state';
import Game from '../../components/game/game';
import Page from '../_/page';

class GamePage extends Page {
  private game: Game;

  constructor() {
    super();

    if (State.data.game) {
      this.game = State.data.game;
    } else {
      this.game = new Game();
      State.setDataKey('game', this.game);
    }

    this.game.render(this.container, ElementPosition.BEFORE_END);
  }
}

export default GamePage;

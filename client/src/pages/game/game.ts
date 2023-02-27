import { ElementPosition } from '../../app/types';
import { StateGame } from '../../app/stateGame';
import Game from '../../components/game/game';
import Page from '../_/page';

class GamePage extends Page {
  private game: Game;

  constructor() {
    super();

    if (StateGame.data.game) {
      this.game = StateGame.data.game;
    } else {
      this.game = new Game();
      StateGame.setDataKey('game', this.game);
    }

    this.game.render(this.container, ElementPosition.BEFORE_END);
  }
}

export default GamePage;

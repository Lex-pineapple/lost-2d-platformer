import Game from '../components/game/game';

export type StateGameData = {
  game: Game | null
};

export class StateGame {
  static #data: StateGameData = {
    game: null,
  };

  static get data() {
    return StateGame.#data;
  }

  static setDataKey<K extends keyof StateGameData>(
    stateGameDataKey: K,
    stateGameDataItem: StateGameData[K]
    ) {
    StateGame.#data[stateGameDataKey] = stateGameDataItem;
  }
}

export default StateGame;

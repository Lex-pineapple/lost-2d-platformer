import Game from '../components/game/game';

export type StateData = {
  playerId: number | null;
  playerName: string;
  game: Game | null
};

export class State {
  static #data: StateData = {
    playerId: null,
    playerName: '',
    game: null,
  };

  static get data() {
    return State.#data;
  }

  static setDataKey<K extends keyof StateData>(stateDataKey: K, stateDataItem: StateData[K]) {
    State.#data[stateDataKey] = stateDataItem;
  }
}

export default State;

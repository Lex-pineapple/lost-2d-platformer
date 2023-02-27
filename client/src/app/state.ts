export type StateData = {
  playerId: number | null;
  playerName: string;
};

export class State {
  static #data: StateData = {
    playerId: null,
    playerName: '',
  };

  static get data() {
    return State.#data;
  }

  static setDataKey<K extends keyof StateData>(stateDataKey: K, stateDataItem: StateData[K]) {
    State.#data[stateDataKey] = stateDataItem;
  }
}

export default State;

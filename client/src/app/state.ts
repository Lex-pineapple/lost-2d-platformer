export type StateData = {
  playerId: number | null;
  playerName: string;
  theme: 'light' | 'dark';
};

export class State {
  static #data: StateData = {
    playerId: null,
    playerName: '',
    theme: 'light',
  };

  static get data() {
    return State.#data;
  }

  static setDataKey<K extends keyof StateData>(stateDataKey: K, stateDataItem: StateData[K]) {
    State.#data[stateDataKey] = stateDataItem;
  }
}

export default State;

export type StateData = {};

export class State {
  static #data: StateData = {
  };

  static get data() {
    return State.#data;
  }

  static setDataKey<K extends keyof StateData>(stateDataKey: K, stateDataItem: StateData[K]) {
    State.#data[stateDataKey] = stateDataItem;
  }
}

export default State;

export enum SaveItems {
  masterVolume = 'masterVolume',
  musicVolume = 'musicVolume',
  effectsVolume = 'effectsVolume',
  score = 'score',
  playerHP = 'playerHP',
  lastLevel = 'lastLevel'
}

export const saveToLocalStorage = (key: string, value: number | string) => {
  if (typeof value === 'string') {
    localStorage.setItem(key, value);
  } else {
    localStorage.setItem(key, String(value));
  }
};

export const getFromLocalStorage = (key: string): string | null => localStorage.getItem(key);

export const getAllFromLocalStorage = () => {
  const localKeys = Object.keys(localStorage);
  const localValues = Object.values(localStorage);
  return [...localKeys, ...localValues];
};

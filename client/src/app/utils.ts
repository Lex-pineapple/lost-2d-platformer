export default class Utils {
  static createEl(name: string, classList: string[] = [], text?: string) {
    const el = document.createElement(name);

    if (classList && Array.isArray(classList) && classList.length) {
      el.classList.add(...classList);
    }

    if (text) {
      el.textContent = text;
    }

    return el;
  }

  static clearElContents(el: HTMLElement) {
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
  }

  static isObject<T, U>(obj: { [key: string]: T } | U) {
    const result = obj && typeof obj === 'object' && !Array.isArray(obj);
    return !!result;
  }

  static getIndexInArray<T>(array: T[], el: T) {
    return Array.prototype.indexOf.call(array, el);
  }

  static shuffle<T>(arr: T[]) {
    // Uses the modern version of the Fisher–Yates shuffle algorithm
    const newArr = [...arr];
    for (let i = newArr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  }

  static getRandomItemInArray<T>(arr: T[]) {
    const shuffled = Utils.shuffle(arr);
    return shuffled[Math.floor(Math.random() * shuffled.length)];
  }

  static getRandomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  static wait = async (time: number) => {
    await new Promise((resolve) => {
      setTimeout(resolve, time * 1000);
    });
    return 'Timer is done!';
  };
}

import { ElementPosition } from '../../app/types';

abstract class Component {
  protected content: string | HTMLElement = '';

  render(targetEl: HTMLElement, position: ElementPosition) {
    if (typeof this.content === 'string') {
      targetEl.insertAdjacentHTML(position, this.content);
    } else {
      targetEl.insertAdjacentElement(position, this.content);
    }
  }

  add(what: string | HTMLElement, where: string, root: HTMLElement, callback?: () => void) {
    const whereEl = root.querySelector(where);

    if (whereEl && typeof what === 'string') {
      if (callback) {
        callback();
      }

      whereEl.insertAdjacentHTML(ElementPosition.BEFORE_END, what);
    } else if (whereEl && typeof what !== 'string') {
      whereEl.insertAdjacentElement(ElementPosition.BEFORE_END, what);
    }
  }
}

export default Component;

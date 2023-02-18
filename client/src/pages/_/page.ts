import Utils from '../../app/utils';
import { ElementPosition } from '../../app/types';
import PageTitle from '../../components/page-title/page-title';

abstract class Page {
  protected container: HTMLElement;

  protected title: PageTitle;

  protected content: string | HTMLElement = '';

  constructor(title?: string) {
    this.container = Utils.createEl('div', ['page__main-content']);

    this.title = title ? new PageTitle(title) : new PageTitle();
    this.title.render(this.container, ElementPosition.BEFORE_END);
  }

  addContent() {
    if (this.content) {
      if (typeof this.content === 'string') {
        this.container.insertAdjacentHTML(ElementPosition.BEFORE_END, this.content);
      } else {
        // if typeof this.content is HTMLElement
        this.container.insertAdjacentElement(ElementPosition.BEFORE_END, this.content);
      }
    }
  }

  render(targetEl: HTMLElement) {
    if (targetEl) {
      targetEl.append(this.container);
    }
  }

  clear() {
    Utils.clearElContents(this.container);
  }

  destroy() {
    this.clear();
    this.container.remove();
  }
}

export default Page;

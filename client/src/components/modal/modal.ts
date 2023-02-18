import { ElementPosition } from '../../app/types';
import Utils from '../../app/utils';
import Component from '../_/component';
import closeIcon from '../../assets/images/svg/slose.svg';

class Modal extends Component {
  private modalEl: HTMLElement;

  private modalBodyEl: HTMLElement;

  protected content: HTMLElement;

  constructor(innerContent: string | HTMLElement = '', private closeCallback?: () => void) {
    super();
    this.modalEl = Utils.createEl('div', ['modal']);
    this.modalBodyEl = Utils.createEl('div', ['modal__body', 'js-modal-body']);

    this.content = this.build(innerContent);
  }

  build(innerContent: string | HTMLElement) {
    const modalDialogEl = Utils.createEl('div', ['modal__dialog']);
    const modalContentEl = Utils.createEl('div', ['modal__content']);
    const modalCloseEl = Utils.createEl('button', ['modal__close', 'js-modal-close']) as HTMLButtonElement;
    modalCloseEl.type = 'button';

    modalCloseEl.insertAdjacentHTML(ElementPosition.BEFORE_END, closeIcon);

    modalCloseEl.addEventListener('click', this.close.bind(this));

    this.setContents(innerContent);

    modalContentEl.append(this.modalBodyEl);
    modalContentEl.append(modalCloseEl);
    modalDialogEl.append(modalContentEl);
    this.modalEl.append(modalDialogEl);

    return this.modalEl;
  }

  setContents(innerContent: string | HTMLElement) {
    this.modalBodyEl.textContent = '';

    if (typeof innerContent === 'string') {
      this.modalBodyEl.insertAdjacentHTML(ElementPosition.BEFORE_END, innerContent);
    } else {
      // if typeof innerContent is HTMLElement
      this.modalBodyEl.insertAdjacentElement(ElementPosition.BEFORE_END, innerContent);
    }
  }

  open() {
    this.modalEl.classList.add('opened');
    document.body.classList.add('modal-opened');
  }

  close() {
    this.modalEl.classList.remove('opened');
    document.body.classList.remove('modal-opened');
    if (this.closeCallback) this.closeCallback();
  }

  toggle() {
    this.modalEl.classList.toggle('opened');
    document.body.classList.toggle('modal-opened');
  }

  destroy() {
    this.close();
    this.modalEl.remove();
  }
}

export default Modal;

import Component from '../_/component';
import { ElementPosition } from '../../app/types';
import Menu from '../menu/menu';
import Utils from '../../app/utils';

class Header extends Component {
  protected content: HTMLElement;

  constructor(private menu?: Menu) {
    super();
    this.content = this.build();
  }

  build() {
    const headerEl = Utils.createEl('header', ['page__header', 'header']);

    const html = `
      <div class="header__container container js-header-container">
      </div>
    `;

    headerEl.insertAdjacentHTML(ElementPosition.BEFORE_END, html);

    if (this.menu) {
      const menuEl = Utils.createEl('div', ['header__menu', 'menu']);
      this.menu.render(menuEl, ElementPosition.BEFORE_END);

      if (headerEl) {
        const headerContainerEl = headerEl.querySelector('.js-header-container');
        if (headerContainerEl) {
          headerContainerEl.insertAdjacentElement(ElementPosition.BEFORE_END, menuEl);
        }
      }
    }

    return headerEl;
  }
}

export default Header;

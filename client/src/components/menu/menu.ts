import Component from '../_/component';
import Router, { PagePaths } from '../../app/router';
import Utils from '../../app/utils';
import { ElementPosition } from '../../app/types';

const MenuData = [
  {
    text: 'Game',
    path: PagePaths.GamePage.path,
    cls: 'js-menu-link',
  },
  {
    text: 'High Score',
    path: PagePaths.HighscorePage.path,
    cls: 'js-menu-link',
  },
  {
    text: 'About',
    path: PagePaths.AboutPage.path,
    cls: 'js-menu-link',
  },
  {
    text: 'Log out',
    path: '/',
    cls: 'logout',
  },
];

class Menu extends Component {
  protected content: HTMLElement;

  constructor() {
    super();
    this.content = this.build();
  }

  build() {
    let menuItemsHtml = '';

    MenuData.forEach((item) => {
      menuItemsHtml += `<li class="menu__item"><a class="menu__link link link--dark ${item.cls}" href="${item.path}">${item.text}</a></li>`;
    });

    const html = `
      <ul class="menu__list">
        ${menuItemsHtml}
      </ul>
    `;

    const menuNavEl = Utils.createEl('nav', ['menu__nav']);
    menuNavEl.insertAdjacentHTML(ElementPosition.BEFORE_END, html);

    menuNavEl.addEventListener('click', (event: Event) => {
      const targetEl = event.target as HTMLElement;

      if (targetEl && targetEl.matches('.js-menu-link')) {
        const linkEl = event.target as HTMLAnchorElement;
        event.preventDefault();
        const url = new URL(linkEl.href);
        Router.loadRoute(url.pathname);
      }
    });

    return menuNavEl;
  }
}

export default Menu;

import Component from '../_/component';
import Router, { PagePaths } from '../../app/router';
import Utils from '../../app/utils';
import { ElementPosition } from '../../app/types';
import { State } from '../../app/state';

const MenuData = [
  {
    text: 'Game',
    path: PagePaths.GamePage.path,
    outerClsModifier: 'game',
    innerCls: 'js-menu-link',
  },
  {
    text: 'High Score',
    path: PagePaths.HighscorePage.path,
    outerClsModifier: 'highscores',
    innerCls: 'js-menu-link',
  },
  {
    text: 'About',
    path: PagePaths.AboutPage.path,
    outerClsModifier: 'about',
    innerCls: 'js-menu-link',
  },
  {
    text: State.data.playerName,
    path: null,
    outerClsModifier: 'player-name',
    innerCls: 'menu__player-name',
  },
  {
    text: 'Log out',
    path: '/',
    outerClsModifier: 'logout',
    innerCls: 'logout js-logout',
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
      const inner = item.path
      ? `
        <a class="menu__link link link--dark ${item.innerCls}" href="${item.path}">${item.text}</a>
      `
      : `
        <span class="${item.innerCls}">${State.data.playerName}</a>
      `;

      menuItemsHtml += `
        <li class="menu__item ${item.outerClsModifier ? `menu__item--${item.outerClsModifier}` : ''}">${inner}</li>
      `;
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

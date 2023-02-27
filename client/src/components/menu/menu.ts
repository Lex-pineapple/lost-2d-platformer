import Component from '../_/component';
import Router, { PagePaths } from '../../app/router';
import Utils from '../../app/utils';
import { ElementPosition } from '../../app/types';
import { State } from '../../app/state';
import darkModeIcon from '../../assets/dark-mode.svg';
import lightModeIcon from '../../assets/light-mode.svg';

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
    text: 'switch-theme',
    path: 'switch-theme',
    outerClsModifier: 'switch-theme',
    innerCls: 'menu__switch-theme',
  },
  {
    text: State.data.playerName,
    path: 'player-name',
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
      let inner = `
        <a class="menu__link link link--dark ${item.innerCls}" href="${item.path}">${item.text}</a>
      `;

      if (item.path === 'switch-theme') {
        inner = `
          <button class="${item.innerCls} button js-switch-theme" type="button">
          ${State.data.theme === 'light' ? darkModeIcon : lightModeIcon}
          </button>
        `;
      }

      if (item.path === 'player-name') {
        inner = `
          <span class="${item.innerCls}">${State.data.playerName}</span>
        `;
      }

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

    const switchThemeBtn = menuNavEl.querySelector('.js-switch-theme');

    if (switchThemeBtn) {
      switchThemeBtn.addEventListener('click', (event: Event) => {
        event.preventDefault();

        if (State.data.theme === 'light') {
          switchThemeBtn.textContent = '';
          switchThemeBtn.insertAdjacentHTML(ElementPosition.BEFORE_END, lightModeIcon);
          console.log('change theme to dark');
          State.setDataKey('theme', 'dark');
          window.localStorage.setItem('theme', 'dark');
          document.body.classList.add('theme-dark');
        } else if (State.data.theme === 'dark') {
          switchThemeBtn.textContent = '';
          switchThemeBtn.insertAdjacentHTML(ElementPosition.BEFORE_END, darkModeIcon);
          console.log('change theme to light');
          State.setDataKey('theme', 'light');
          window.localStorage.setItem('theme', 'light');
          document.body.classList.remove('theme-dark');
        }
      });
    }

    return menuNavEl;
  }
}

export default Menu;

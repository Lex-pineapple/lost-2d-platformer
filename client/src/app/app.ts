import Utils from './utils';
import { ElementPosition } from './types';
import auth from './auth';
import Router from './router';
import Menu from '../components/menu/menu';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import { State } from './state';

class App {
  public pageEl = Utils.createEl('div', ['page']);

  public mainPageEl = Utils.createEl('main', ['page__main']);

  private router: Router;

  constructor() {
    this.router = new Router(this.mainPageEl, this.pageEl);
  }

  async start() {
    const authVerificationData = await auth.verify();

    if (!authVerificationData || !authVerificationData.result) {
      return;
    }

    const { playerId, playerName } = authVerificationData;

    if (playerId) State.setDataKey('playerId', playerId);
    if (playerName) State.setDataKey('playerName', playerName);

    const menu = new Menu();

    const header = new Header(menu);
    header.render(this.pageEl, ElementPosition.BEFORE_END);

    this.pageEl.append(this.mainPageEl);

    const footer = new Footer();
    footer.render(this.pageEl, ElementPosition.BEFORE_END);

    document.body.append(this.pageEl);

    this.router.loadInitialRoute();

    window.addEventListener('popstate', () => {
      Router.loadView(window.location.pathname);
    });

    const logoutEl = document.querySelector('.logout');

    if (logoutEl) {
      logoutEl.addEventListener('click', (event: Event) => {
        event.preventDefault();
        auth.logout();
      });
    }
  }
}

export default App;

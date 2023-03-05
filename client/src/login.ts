import auth from './app/auth';
import Utils from './app/utils';
import LoginPage from './pages/login/login';
import './login.scss';
// import './assets/images/favicon.ico';

const pageEl = Utils.createEl('div', ['page', 'page--login']);
const mainPageEl = Utils.createEl('main', ['page__main']);

pageEl.append(mainPageEl);

document.body.append(pageEl);

(async () => {
  if (await auth.is()) {
    auth.loadApp();
  } else {
    const loginPage = new LoginPage();

    if (loginPage) {
      loginPage.render(mainPageEl);
    }
  }
})();

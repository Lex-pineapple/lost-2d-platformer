import auth from './app/auth';
// import Login from './app/login';
// import { ElementPosition } from './app/types';
import Utils from './app/utils';
// import LoginWidget from './components/login-form/login-form';
import LoginPage from './pages/login/login';
import './login.scss';
// import './assets/images/favicon.ico';

const pageEl = Utils.createEl('div', ['page', 'page--login']);
const mainPageEl = Utils.createEl('main', ['page__main']);

// const mainContentEl = Utils.createEl('div', ['page__main-content']);
pageEl.append(mainPageEl);
// mainPageEl.append(mainContentEl);
document.body.append(pageEl);

if (auth.is()) {
  auth.loadApp();
} else {
  // const loginWidget = new LoginWidget();
  // loginWidget.render(mainContentEl, ElementPosition.BEFORE_END);

  // const loginFormEl = document.querySelector('.login-form');

  // if (loginFormEl instanceof HTMLFormElement) {
  //   const fields = ['email', 'password'];
  //   new Login(loginForm, fields);
  // }

  const loginPage = new LoginPage();

  if (loginPage) {
    loginPage.render(mainPageEl);
  }
}

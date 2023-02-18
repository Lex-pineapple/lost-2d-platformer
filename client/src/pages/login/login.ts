import { ElementPosition } from '../../app/types';
import LoginWidget from '../../components/login-widget/login-widget';
import Page from '../_/page';

class LoginPage extends Page {
  private loginWidget: LoginWidget;

  constructor() {
    super();

    this.loginWidget = new LoginWidget();
    this.loginWidget.render(this.container, ElementPosition.BEFORE_END);
  }

  // build() {
  //   // mainPageEl.append(mainContentEl);

  //   const loginForm = document.querySelector('.login-form');

  //   if (loginForm instanceof HTMLFormElement) {
  //     const fields = ['email', 'password'];
  //     // new Login(loginForm, fields);
  //   }
  // }
}

export default LoginPage;

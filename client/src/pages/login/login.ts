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
}

export default LoginPage;

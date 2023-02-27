import auth from '../../app/auth';
import { ElementPosition, Player, PlayerSignupKeys } from '../../app/types';
import Utils from '../../app/utils';
import Component from '../_/component';

class LoginWidget extends Component {
  protected content: HTMLElement;

  protected form: HTMLFormElement;

  protected fieldNames: PlayerSignupKeys[] = ['email', 'password', 'name'];

  private formType: 'login' | 'signup' = 'login';

  constructor() {
    super();
    this.form = Utils.createEl('form', ['login-widget__form']) as HTMLFormElement;
    this.form.setAttribute('action', '/');
    this.content = this.build();
  }

  build() {
    const loginEl = Utils.createEl('div', ['login-widget']);
    const loginInnerEl = Utils.createEl('div', ['login-widget__inner']);
    loginEl.append(loginInnerEl);
    loginInnerEl.append(this.form);

    const html = `
      <div class="form__decor">
        <img src="assets/login-decor.svg" class="form__decor-img">
      </div>
      <div class="form__inner js-form-inner">
        ${this.getFormContents()}
      </div>
    `;

    this.form.insertAdjacentHTML(ElementPosition.BEFORE_END, html);

    this.addSwitchHandler();

    this.addSubmitHandler();

    return loginEl;
  }

  getFormContents() {
    let html = `
      <h2 class="login-widget__title js-login-widget-title">
        ${(this.formType === 'login') ? 'Login' : 'Sign up'}
      </h2>
    `;

    if (this.formType === 'signup') {
      html += `
        <div class="form__group js-form-group-name">
          <label for="name" class="label">Displayed name</label>
          <input type="text" id="name">
          <span class="error-message"></span>
        </div>
      `;
    }

    html += `
      <div class="form__group js-form-group-email">
        <label for="email" class="label">E-mail</label>
        <input type="text" id="email">
        <span class="error-message"></span>
      </div>
      <div class="form__group js-form-group-password">
        <label for="password" class="label">Password</label>
        <input type="password" id="password">
        <span class="error-message"></span>
      </div>
      <button class="button js-submit-button" type="submit">
        ${(this.formType === 'login') ? 'Login' : 'Sign up'}
      </button>
      <div class="form__switch js-form-switch">
        <span class="js-switch-text">
          ${
            (this.formType === 'login')
            ? 'Don\'t have an account yet?'
            : 'Already have an account?'
          }
        </span>
        <button class="form__switch-button js-switch-button" type="button">
          ${(this.formType === 'login') ? 'Sign up' : 'Login'}
        </button>
      </div>
    `;

    return html;
  }

  addSwitchHandler() {
    const switchBtn = this.form.querySelector('.js-switch-button');

    if (!switchBtn || !(switchBtn instanceof HTMLElement)) {
      return;
    }

    switchBtn.addEventListener('click', (event: Event) => {
      event.preventDefault();

      this.formType = (this.formType === 'login') ? 'signup' : 'login';

      this.removeSubmitHandler();

      this.changeFormContents(this.getFormContents());

      this.addSwitchHandler();

      this.addSubmitHandler();
    });
  }

  changeFormContents = (html = '', add = false) => {
    const formInnerEl = this.form.querySelector('.js-form-inner');

    if (formInnerEl) {
      if (!add) formInnerEl.textContent = '';
      formInnerEl.insertAdjacentHTML(ElementPosition.BEFORE_END, html);
    }
  };

  addErrorMessage = (text?: string) => {
    this.removeErrorMessage();
    const messageText = text || 'There was an error. Please, try again';

    const html = `
      <p class="form__error js-form-error">${messageText}</p>
    `;

    this.changeFormContents(html, true);
  };

  removeErrorMessage = () => {
    const formErrorEl = this.form.querySelector('.js-form-error');
    if (formErrorEl) formErrorEl.remove();
  };

  submitHandler = async (event: Event) => {
    event.preventDefault();
    this.removeErrorMessage();

    let errors = 0;

    const credentials: Pick<Player, PlayerSignupKeys> = {
      name: '',
      email: '',
      password: '',
    };

    this.fieldNames.forEach((fieldName) => {
      const input = this.form.querySelector(`#${fieldName}`);

      if (input && input instanceof HTMLInputElement) {
        credentials[fieldName] = input.value;

        if (!this.isValidField(input)) {
          errors += 1;
        }
      }
    });

    if (errors === 0) {
      if (this.formType === 'signup') {
        const responseData = await auth.signup(credentials);

        if (responseData && 'token' in responseData) {
          const html = `
            <p class="form__afterword">Thank you! You can now <button class="form__switch-button js-switch-button" type="button">login</button>.</p>
          `;

          this.changeFormContents(html);
          this.addSwitchHandler();
        } else {
          this.addErrorMessage('This e-mail is not valid or is already registered. Please, try again');
        }
      }

      if (this.formType === 'login') {
        const loginCredentials = {
          email: credentials.email,
          password: credentials.password,
        };

        const responseData = await auth.login(loginCredentials);

        if (responseData && 'token' in responseData) {
          auth.loadApp();
        } else {
          this.addErrorMessage('Wrong e-mail or password. Please, try again');
        }
      }
    }
  };

  addSubmitHandler() {
    this.form.addEventListener('submit', this.submitHandler);
  }

  removeSubmitHandler() {
    this.form.removeEventListener('submit', this.submitHandler);
  }

  isValidField(field: HTMLInputElement) {
    if (field.value.trim() === '') {
      this.setStatus(
        field,
        `${field.previousElementSibling?.textContent} cannot be blank`,
        'error'
      );
      return false;
    }

    if (this.formType === 'signup' && field.type === 'password') {
      if (field.value.length < 5) {
        this.setStatus(
          field,
          `${field.previousElementSibling?.textContent} must be at least 5 characters`,
          'error'
        );

        return false;
      }

      this.setStatus(field, null, 'success');
      return true;
    }

    this.setStatus(field, null, 'success');
    return true;
  }

  setStatus(field: HTMLInputElement, message: string | null, status: string) {
    const errorMessageEl = field.parentElement?.querySelector('.error-message');

    if (status === 'success') {
      if (errorMessageEl) {
        errorMessageEl.textContent = '';
      }

      field.classList.remove('input-error');
    }

    if (errorMessageEl && status === 'error') {
      errorMessageEl.textContent = message;
      field.classList.add('input-error');
    }
  }
}

export default LoginWidget;

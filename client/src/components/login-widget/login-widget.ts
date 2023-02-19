import auth from '../../app/auth';
import { ElementPosition } from '../../app/types';
import Utils from '../../app/utils';
import Component from '../_/component';

class LoginWidget extends Component {
  protected content: HTMLElement;

  protected form: HTMLFormElement;

  protected fieldNames = ['email', 'password'];

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

    // const loginTitleEl = Utils.createEl('h2', ['login-widget__title'], 'Login');
    // loginInnerEl.append(loginTitleEl);
    loginInnerEl.append(this.form);

    const html = `
      <div class="form__decor">
        <img src="assets/login-decor.svg" class="form__decor-img">
      </div>
      <h2 class="login-widget__title">Login</h2>
      <div class="form__group">
        <label for="email" class="label">E-mail</label>
        <input type="text" id="email">
        <span class="error-message"></span>
      </div>
      <div class="form__group">
        <label for="password" class="label">Password</label>
        <input type="password" id="password">
        <span class="error-message"></span>
      </div>
      <button class="button" type="submit">Login</button>
    `;

    this.form.insertAdjacentHTML(ElementPosition.BEFORE_END, html);

    this.addSubmitHandler();

    return loginEl;
  }

  addSubmitHandler() {
    this.form.addEventListener('submit', async (event: Event) => {
      event.preventDefault();

      let errors = 0;

      this.fieldNames.forEach((fieldName) => {
        const input = this.form.querySelector(`#${fieldName}`);

        if (input instanceof HTMLInputElement && !this.isValidField(input)) {
          errors += 1;
        }
      });

      if (errors === 0) {
        localStorage.setItem('auth', '1');
        // remove login form
        // or just clear the document.body

        auth.loadApp();
        // document.body.textContent = '';
        // // need to add main.js and remove login.js if possible
        // const manifestObj = await filesHttpClient.getFile('manifest.json') as IManifest;
        // console.log(manifestObj);

        // if (manifestObj && manifestObj.main) {
        //   const oldScriptEl = document.head.querySelector('script');
        //   if (oldScriptEl) oldScriptEl.remove();
        //   const scriptEl = document.createElement('script');
        //   scriptEl.src = manifestObj.main;
        //   document.head.append(scriptEl);
        //   // document.body.append(scriptEl);
        // }

        // run auth? auth shoud be run in app start
        // window.location.replace('/');
        // this.form.submit();
      }
    });
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
      if (field.type === 'password') {
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

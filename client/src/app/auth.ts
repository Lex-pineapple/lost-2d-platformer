import { filesHttpClient } from './http-client';

interface IManifest {
  login: string;
  main: string;
}

class Auth {
  // constructor() {}

  clean() {
    document.body.style.display = 'none';
    const auth = localStorage.getItem('auth');
    this.validate(auth);
  }

  is() {
    const auth = localStorage.getItem('auth');
    return auth === '1';
  }

  validate(auth: string | null) {
    if (auth !== '1') {
      // window.location.replace('/');
    } else {
      document.body.style.display = 'block';
    }
  }

  logOut() {
    localStorage.removeItem('auth');
    window.location.replace('/');
  }

  async loadApp() {
    document.body.textContent = '';
    // need to add main.js and remove login.js if possible
    const manifestObj = await filesHttpClient.getFile('manifest.json') as IManifest;
    console.log(manifestObj);

    if (manifestObj && manifestObj.main) {
      const oldScriptEl = document.head.querySelector('script');
      if (oldScriptEl) oldScriptEl.remove();
      const scriptEl = document.createElement('script');
      scriptEl.src = manifestObj.main;
      document.head.append(scriptEl);
      // document.body.append(scriptEl);
    }
  }
}

const auth = new Auth();
export default auth;

import { filesHttpClient } from './http-client';
import { Loader } from './loader';
import { Player, PlayerLoginKeys, PlayerSignupKeys } from './types';

interface IManifest {
  login: string;
  main: string;
}

class Auth {
  async signup(credentials: Pick<Player, PlayerSignupKeys>) {
    const signupData = await Loader.createPlayer(credentials);
    return signupData;
  }

  async login(credentials: Pick<Player, PlayerLoginKeys>) {
    const loginData = await Loader.loginPlayer(credentials);

    if (loginData && 'token' in loginData) {
      localStorage.setItem('auth', loginData.token);
    }

    return loginData;
  }

  async verify() {
    const token = localStorage.getItem('auth');
    if (!token) return { result: false };
    return Loader.verifyPlayer(token);
  }

  async is() {
    const authVerificationData = await this.verify();
    return authVerificationData ? authVerificationData.result : false;
  }

  async clean() {
    document.body.style.display = 'none';
    this.validate();
  }

  async validate() {
    if (await this.is()) {
      document.body.style.display = 'block';
    } else {
      window.location.replace('/');
    }
  }

  logout() {
    localStorage.removeItem('auth');
    window.location.replace('/');
  }

  async loadApp() {
    document.body.textContent = '';
    const manifestObj = await filesHttpClient.getFile('manifest.json') as IManifest;

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

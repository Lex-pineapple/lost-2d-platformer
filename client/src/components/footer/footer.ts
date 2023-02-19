import Component from '../_/component';

class Footer extends Component {
  protected content = `
    <footer class="page__footer footer">
      <div class="footer__container container">
        <h2 class="visually-hidden">Lost 2D Platformer Footer</h2>

        <div class="footer__row footer__row--copyright copyright">
          <p class="footer__copyright">
            <a class="footer__logo" href="https://rs.school/js/">
              <img src="assets/rs-school-js.svg" alt="Logo" width="300" height="111">
            </a>
            <span>© 2023
              <a href="https://github.com/Lex-pineapple">Lex-pineapple</a> ・
              <a href="https://github.com/kostili-tec">Kostili-tec</a> ・
              <a href="https://github.com/webkwondo">Webkwondo</a>
            </span>
          </p>
        </div>

      </div>
    </footer>
  `;
}

export default Footer;

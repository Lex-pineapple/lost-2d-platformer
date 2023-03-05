import { ElementPosition } from '../../app/types';
import Utils from '../../app/utils';
import Component from '../_/component';

class About extends Component {
  protected content: HTMLElement;

  aboutEl: HTMLElement;

  constructor() {
    super();
    this.aboutEl = Utils.createEl('section', ['page__about', 'about']);
    this.content = this.build();
  }

  build() {
    const html = `
      <div class="about__container container js-about-container">
        <h2 class="about__title">Authors</h2>
        <div class="about__authors">

          <div class="about__author">
            <div class="about__author-avatar">
              <img src="assets/author-avatar-2.jpg" alt="Author avatar">
            </div>
            <div class="about__author-bio">
              <b><a href="https://github.com/kostili-tec">Kostili-tec</a></b>
              <p>Sound desiner, game developer</p>
            </div>
          </div>

          <div class="about__author">
            <div class="about__author-avatar">
              <img src="assets/author-avatar-1.jpg" alt="Author avatar">
            </div>
            <div class="about__author-bio">
              <b><a href="https://github.com/Lex-pineapple">Lex-pineapple</a></b>
              <p>Team lead, game desiner, game developer</p>
            </div>
          </div>

          <div class="about__author">
            <div class="about__author-avatar">
              <img src="assets/author-avatar-3.jpg" alt="Author avatar">
            </div>
            <div class="about__author-bio">
              <b><a href="https://github.com/webkwondo">Webkwondo</a></b>
              <p>Backender, game developer</p>
            </div>
          </div>

        </div>
      </div>
    `;

    this.aboutEl.insertAdjacentHTML(ElementPosition.BEFORE_END, html);

    return this.aboutEl;
  }
}

export default About;

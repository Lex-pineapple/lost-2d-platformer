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
      </div>
    `;

    this.aboutEl.insertAdjacentHTML(ElementPosition.BEFORE_END, html);

    return this.aboutEl;
  }
}

export default About;

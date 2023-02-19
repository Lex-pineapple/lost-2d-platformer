// import { Loader } from '../../app/loader';
import { State } from '../../app/state';
import { ElementPosition } from '../../app/types';
import Utils from '../../app/utils';
import Component from '../_/component';
// import Paginator from '../paginator/paginator';

class Highscore extends Component {
  protected content: HTMLElement;

  highscoreEl: HTMLElement;

  constructor() {
    super();
    this.highscoreEl = Utils.createEl('section', ['page__highscore', 'highscore']);
    this.content = this.build();
  }

  build() {
    const html = `
      <div class="highscore__container container js-highscore-container">
        <h2 class="highscore__title">High Score</h2>
      </div>
    `;

    this.highscoreEl.insertAdjacentHTML(ElementPosition.BEFORE_END, html);

    return this.highscoreEl;
  }
}

export default Highscore;

import { Loader } from '../../app/loader';
import { ElementPosition, Highscore } from '../../app/types';
import Utils from '../../app/utils';
import Component from '../_/component';

class Highscores extends Component {
  protected content: HTMLElement;

  private highscoresEl: HTMLElement;

  private highscores: { id: number; el: HTMLElement }[] = [];

  private tableEl: HTMLElement;

  private tableBodyEl: HTMLElement;

  constructor() {
    super();
    this.highscoresEl = Utils.createEl('section', ['page__highscores', 'highscores']);
    this.tableEl = Utils.createEl('div', ['highscores__table', 'table']);
    this.tableBodyEl = Utils.createEl('div', ['table__tbody', 'js-highscores-table-tbody']);
    this.content = this.build();
  }

  build() {
    const html = `
      <div class="highscores__container container js-highscores-container">
        <h2 class="highscores__title">High Score</h2>
      </div>
    `;

    this.highscoresEl.insertAdjacentHTML(ElementPosition.BEFORE_END, html);

    const highscoresContainerEl = this.highscoresEl.querySelector('.js-highscores-container');

    if (highscoresContainerEl) {
      highscoresContainerEl.insertAdjacentElement(ElementPosition.BEFORE_END, this.tableEl);
    }

    this.buildTable();

    return this.highscoresEl;
  }

  buildTable() {
    const html = `
      <div class="table__thead">
        <div class="table__tr">
          <div class="table__th table__th--ordinal-number">#</div>
          <div class="table__th table__th--name">Name</div>
          <div class="table__th table__th--highscore"><span class="js-th-wins">High Score</span></div>
        </div>
      </div>
    `;

    this.tableEl.insertAdjacentHTML(ElementPosition.BEFORE_END, html);
    this.tableEl.insertAdjacentElement(ElementPosition.BEFORE_END, this.tableBodyEl);

    this.buildRows();
  }

  async buildRows() {
    const gotten = await Loader.getHighscores();

    if (!gotten) return;

    this.highscores = [];
    Utils.clearElContents(this.tableBodyEl);

    let rowIndex = 0;

    gotten.forEach((highscoreObj) => {
      const highscoreRowEl = this.buildRow(highscoreObj, rowIndex + 1);
      this.highscores.push({ id: highscoreObj.id, el: highscoreRowEl });
      this.tableBodyEl.insertAdjacentElement(ElementPosition.BEFORE_END, highscoreRowEl);
      rowIndex += 1;
    });
  }

  buildRow(highscoreObj: Highscore, ordinal: number) {
    const rowEl = Utils.createEl('div', ['table__tr', 'highscore', 'js-highscore']);
    rowEl.dataset.highscoreId = highscoreObj.id.toString();

    const html = `
      <div class="table__td table__td--ordinal-number">${ordinal}</div>
      <div class="table__td table__td--name">
        <div class="highscore__name">${highscoreObj.player.name}</div>
      </div>
      <div class="table__td table__td--highscore">
        <div class="highscore__highscore">${highscoreObj.highscore}</div>
      </div>
    `;

    rowEl.insertAdjacentHTML(ElementPosition.BEFORE_END, html);

    return rowEl;
  }
}

export default Highscores;

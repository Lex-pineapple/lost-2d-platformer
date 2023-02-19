import Component from '../_/component';

class PageTitle extends Component {
  protected content = '';

  constructor(private title?: string, private visibility = true) {
    super();
    this.content = this.build();
  }

  build() {
    const title = this.title || 'Game';
    const visibility = !!(this.title && this.visibility);

    const html = `
      <div class="page__title ${visibility ? '' : 'visually-hidden'}">
        <div class="page__title-container container">
          <h1 class="page__title-copy">${title}</h1>
        </div>
      </div>
    `;

    return html;
  }
}

export default PageTitle;

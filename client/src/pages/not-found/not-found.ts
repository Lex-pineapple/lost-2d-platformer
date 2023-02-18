import Page from '../_/page';

class NotFoundPage extends Page {
  protected content = `
    <section class="page__not-found not-found">
      <h2 class="visually-hidden">Not Found</h2>

      <div class="not-found__container container">

        <div class="not-found__inner">

          <h1 class="not-found__title">404</h1>
          <h3 class="not-found__subtext">Sorry! The page you are looking for can’t be found.</h3>
          <p class="not-found__go">Please, go back to the homepage.</p>

        </div>

      </div>
    </section>
  `;

  constructor(title = '') {
    super(title);
    this.addContent();
  }
}

export default NotFoundPage;

import { ElementPosition } from '../../app/types';
import About from '../../components/about/about';
import Page from '../_/page';

class AboutPage extends Page {
  private about: About;

  constructor() {
    super();

    this.about = new About();
    this.about.render(this.container, ElementPosition.BEFORE_END);
  }
}

export default AboutPage;

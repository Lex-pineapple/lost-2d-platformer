import Utils from './utils';
import NotFoundPage from '../pages/not-found/not-found';
import GamePage from '../pages/game/game';
import HighscorePage from '../pages/highscore/highscore';
import AboutPage from '../pages/about/about';
import { State } from './state';

type Params = {
  [key: string]: string;
};

type Route = {
  path: string;
  identifier: string;
  title: string;
  renderPage: (outletEl: HTMLElement, params?: Params) => void;
};

export const PagePaths = {
  GamePage: {
    path: '/',
    identifier: 'game-page',
  },
  HighscorePage: {
    path: '/highscore',
    identifier: 'highscore-page',
  },
  AboutPage: {
    path: '/about',
    identifier: 'about-page',
  },
  NotFoundPage: {
    path: '/not-found',
    identifier: 'not-found-page',
  },
};

export const Routes: Route[] = [
  {
    path: PagePaths.GamePage.path,
    identifier: PagePaths.GamePage.identifier,
    title: 'Game',
    renderPage(outletEl) {
      const page = new GamePage();

      if (page) {
        if (State.data.game) {
          State.data.game.wake();
        }

        page.render(outletEl);
      }
    },
  },
  {
    path: PagePaths.HighscorePage.path,
    identifier: PagePaths.HighscorePage.identifier,
    title: 'High Score',
    renderPage(outletEl) {
      const page = new HighscorePage();

      if (page) {
        if (State.data.game) {
          State.data.game.sleep();
        }

        page.render(outletEl);
      }
    },
  },
  {
    path: PagePaths.AboutPage.path,
    identifier: PagePaths.AboutPage.identifier,
    title: 'About authors',
    renderPage(outletEl) {
      const page = new AboutPage();

      if (page) {
        if (State.data.game) {
          State.data.game.sleep();
        }

        page.render(outletEl);
      }
    },
  },
];

const defaultRoute: Route = {
  path: PagePaths.NotFoundPage.path,
  identifier: PagePaths.NotFoundPage.identifier,
  title: 'Not Found',
  renderPage(outletEl) {
    const page = new NotFoundPage('');

    if (page) {
      if (State.data.game) {
        State.data.game.sleep();
      }

      page.render(outletEl);
    }
  },
};

class Router {
  static #routerOutletEl: HTMLElement;

  static #pageEl: HTMLElement;

  static #routes: Route[];

  constructor(routerOutletEl: HTMLElement, pageEl: HTMLElement, routes = Routes) {
    Router.#routerOutletEl = routerOutletEl;
    Router.#pageEl = pageEl;
    Router.#routes = routes;
  }

  static splitPathname(pathname: string) {
    const pathnameSplit = pathname.split('/');
    const pathSegments = pathnameSplit.length > 1 ? pathnameSplit.slice(1) : [''];
    return pathSegments;
  }

  loadInitialRoute() {
    Router.loadRoute(window.location.pathname, window.location.search);
  }

  static loadView(pathname: string) {
    const urlSegments = Router.splitPathname(pathname);
    const matched = this.#matchUrlToRoute(urlSegments);
    Utils.clearElContents(Router.#routerOutletEl);
    Router.#pageEl.id = matched.route.identifier;
    matched.route.renderPage(Router.#routerOutletEl, matched.params);
  }

  static loadRoute(pathname: string, query?: string) {
    const urlSegments = Router.splitPathname(pathname);
    const url = `/${urlSegments.join('/')}${query || ''}`;
    window.history.pushState({}, '', url);
    Router.loadView(pathname);
  }

  static #matchUrlToRoute(urlSegments: string[]) {
    const routeParams: { [key: string]: string } = {};

    const matchedRoute = Router.#routes.find((route: Route) => {
      const routePathSegments = route.path.split('/').slice(1);

      if (routePathSegments.length !== urlSegments.length) {
        return false;
      }

      // If each segment in the url matches the corresponding segment in the route path,
      // or the route path segment starts with a ':' then the route is matched
      const match = routePathSegments.every((routePathSegment, i) => routePathSegment === urlSegments[i] || routePathSegment[0] === ':');

      // If the route matches the URL, pull out any params from the URL
      if (match) {
        routePathSegments.forEach((segment, i) => {
          if (segment[0] === ':') {
            const propName = segment.slice(1);
            routeParams[propName] = decodeURIComponent(urlSegments[i]);
          }
        });
      }

      return match;
    });

    const found = matchedRoute || defaultRoute;
    return { route: found, params: routeParams, isDefault: !matchedRoute };
  }
}

export default Router;

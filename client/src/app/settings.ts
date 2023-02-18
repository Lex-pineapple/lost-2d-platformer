import { HttpMethod } from './types';

export const ApiSettings = {
  API_HOST: 'http://127.0.0.1',
  API_PORT: 7878,
  API_ENDPOINTS: {
    getPlayers: {
      path: '/players',
      query: {
        page: 'page',
        limit: 'limit',
      },
      method: HttpMethod.GET,
    },
    getPlayer: {
      path: '/players/',
      method: HttpMethod.GET,
    },
    createPlayer: {
      path: '/players',
      headers: {
        'Content-Type': 'application/json',
      },
      method: HttpMethod.POST,
    },
    deletePlayer: {
      path: '/players/',
      method: HttpMethod.DELETE,
    },
    updatePlayer: {
      path: '/players/',
      headers: {
        'Content-Type': 'application/json',
      },
      method: HttpMethod.PUT,
    },
    getHighscores: {
      path: '/highscores',
      query: {
        page: 'page',
        limit: 'limit',
        sort: 'sort',
        order: 'order',
      },
      method: HttpMethod.GET,
    },
    getHighscore: {
      path: '/highscores/',
      method: HttpMethod.GET,
    },
    createHighscore: {
      path: '/highscores',
      headers: {
        'Content-Type': 'application/json',
      },
      method: HttpMethod.POST,
    },
    updateHighscore: {
      path: '/highscores/',
      headers: {
        'Content-Type': 'application/json',
      },
      method: HttpMethod.PUT,
    },
    deleteHighscore: {
      path: '/highscores/',
      method: HttpMethod.DELETE,
    },
  },
};

export const API_URL = `${ApiSettings.API_HOST}:${ApiSettings.API_PORT}`;

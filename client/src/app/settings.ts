import { HttpMethod } from './types';

export const ApiSettings = {
  API_HOST: 'https://lost-2d-platformer-server.onrender.com',
  API_PORT: 7878,
  API_ENDPOINTS: {
    signup: {
      path: '/auth/signup',
      headers: {
        'Content-Type': 'application/json',
      },
      method: HttpMethod.POST,
    },
    login: {
      path: '/auth/login',
      headers: {
        'Content-Type': 'application/json',
      },
      method: HttpMethod.POST,
    },
    verifyToken: {
      path: '/auth/verify',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ',
      },
      method: HttpMethod.POST,
    },
    getPlayer: {
      path: '/players/',
      headers: {
        Authorization: 'Bearer ',
      },
      method: HttpMethod.GET,
    },
    updatePlayer: {
      path: '/players/',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ',
      },
      method: HttpMethod.PATCH,
    },
    getHighscores: {
      path: '/highscores',
      headers: {
        Authorization: 'Bearer ',
      },
      query: {
        limit: 'limit',
      },
      method: HttpMethod.GET,
    },
    getHighscore: {
      path: '/highscores/',
      headers: {
        Authorization: 'Bearer ',
      },
      method: HttpMethod.GET,
    },
    createHighscore: {
      path: '/highscores',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ',
      },
      method: HttpMethod.POST,
    },
    updateHighscore: {
      path: '/highscores/',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ',
      },
      method: HttpMethod.PUT,
    },
  },
};

// export const API_URL = `${ApiSettings.API_HOST}:${ApiSettings.API_PORT}`;
export const API_URL = `${ApiSettings.API_HOST}`;

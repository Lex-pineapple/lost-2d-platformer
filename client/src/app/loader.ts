import { playersHttpClient, highscoresHttpClient, ResponseHandler } from './http-client';
import { ApiSettings, API_URL } from './settings';
import {
  Player,
  Highscore,
  PlayersData,
  HighscoresData,
  PlayerSignupKeys,
  AuthData,
  PlayerLoginKeys,
  AuthVerificationData,
} from './types';

type QueryParams = { key: string; value: string | undefined | null }[];

export class Loader {
  static async createPlayer(playerObj: Pick<Player, PlayerSignupKeys>): Promise<AuthData | null> {
    const url = API_URL + ApiSettings.API_ENDPOINTS.signup.path;
    const { headers } = ApiSettings.API_ENDPOINTS.signup;
    const body = JSON.stringify(playerObj);
    return playersHttpClient.createOne(url, headers, body);
  }

  static async loginPlayer(playerObj: Pick<Player, PlayerLoginKeys>): Promise<AuthData | null> {
    const url = API_URL + ApiSettings.API_ENDPOINTS.login.path;
    const { headers } = ApiSettings.API_ENDPOINTS.login;
    const body = JSON.stringify(playerObj);
    return playersHttpClient.login(url, headers, body);
  }

  static async verifyPlayer(token: string): Promise<AuthVerificationData | null> {
    const url = API_URL + ApiSettings.API_ENDPOINTS.verifyToken.path;
    const { headers } = ApiSettings.API_ENDPOINTS.verifyToken;
    headers.Authorization += token;
    return playersHttpClient.verify(url, headers);
  }

  static async getPlayer(id: number): Promise<Player | null> {
    const url = API_URL + ApiSettings.API_ENDPOINTS.getPlayer.path + id;
    const { headers } = ApiSettings.API_ENDPOINTS.getPlayer;
    const token = localStorage.getItem('auth') || '';
    headers.Authorization += token;
    return playersHttpClient.getOne(url);
  }

  static async updatePlayer(id: number, playerObj: Partial<Omit<Player, 'id'>>): Promise<Player | null> {
    const url = API_URL + ApiSettings.API_ENDPOINTS.updatePlayer.path + id;
    const { headers } = ApiSettings.API_ENDPOINTS.updatePlayer;
    const token = localStorage.getItem('auth') || '';
    headers.Authorization += token;
    const body = JSON.stringify(playerObj);
    return playersHttpClient.updateOne(url, headers, body);
  }

  static async getHighscores(
    pageLimit?: string | null
  ): Promise<HighscoresData | null> {
    const queryOptions = [
      {
        key: ApiSettings.API_ENDPOINTS.getHighscores.query.limit,
        value: pageLimit,
      },
    ];

    const queryString = Loader.generateQueryString(queryOptions);
    const url = API_URL + ApiSettings.API_ENDPOINTS.getHighscores.path + queryString;
    const { headers } = ApiSettings.API_ENDPOINTS.getHighscores;
    const token = localStorage.getItem('auth') || '';
    headers.Authorization += token;
    return highscoresHttpClient.getAll(url);
  }

  static async getHighscore(playerId: number): Promise<Highscore | null> {
    const url = API_URL + ApiSettings.API_ENDPOINTS.getHighscore.path + playerId;
    const { headers } = ApiSettings.API_ENDPOINTS.getPlayer;
    const token = localStorage.getItem('auth') || '';
    headers.Authorization += token;
    return highscoresHttpClient.getOne(url);
  }

  static async createHighscore(highscoreObj: Pick<Highscore, 'highscore' | 'playerId'>): Promise<Highscore | null> {
    const url = API_URL + ApiSettings.API_ENDPOINTS.createHighscore.path;
    const { headers } = ApiSettings.API_ENDPOINTS.createHighscore;
    const token = localStorage.getItem('auth') || '';
    headers.Authorization += token;
    const body = JSON.stringify(highscoreObj);
    return highscoresHttpClient.createOne(url, headers, body);
  }

  static async updateHighscore(id: number, highscoreObj: Pick<Omit<Highscore, 'id'>, 'highscore'>): Promise<Highscore | null> {
    const url = API_URL + ApiSettings.API_ENDPOINTS.updateHighscore.path + id;
    const { headers } = ApiSettings.API_ENDPOINTS.updateHighscore;
    const token = localStorage.getItem('auth') || '';
    headers.Authorization += token;
    const body = JSON.stringify(highscoreObj);
    return highscoresHttpClient.updateOne(url, headers, body);
  }

  static generateQueryString(queryParams: QueryParams) {
    return queryParams.length
      ? `?${queryParams
        .map((p) => (p.value ? `${p.key}=${p.value}` : ''))
        .filter((p) => p)
        .join('&')}`
      : '';
  }
}

export default Loader;

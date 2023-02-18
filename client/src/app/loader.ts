import { playersHttpClient, highscoresHttpClient, ResponseHandler } from './http-client';
import { ApiSettings, API_URL } from './settings';
import {
 Player, Highscore, PlayersData, HighscoresData,
} from './types';

type QueryParams = { key: string; value: string | undefined | null }[];

export class Loader {
  static async getPlayers(pageLimit?: string, page?: string): Promise<PlayersData | null> {
    const queryOptions = [
      {
        key: ApiSettings.API_ENDPOINTS.getPlayers.query.limit,
        value: pageLimit,
      },
      {
        key: ApiSettings.API_ENDPOINTS.getPlayers.query.page,
        value: page,
      },
    ];

    const queryString = Loader.generateQueryString(queryOptions);
    const url = API_URL + ApiSettings.API_ENDPOINTS.getPlayers.path + queryString;
    return playersHttpClient.getAll(url);
  }

  static async getPlayer(id: number): Promise<Player | null> {
    const url = API_URL + ApiSettings.API_ENDPOINTS.getPlayer.path + id;
    return playersHttpClient.getOne(url);
  }

  static async createPlayer(playerObj: Omit<Player, 'id'>): Promise<Player | null> {
    const url = API_URL + ApiSettings.API_ENDPOINTS.createPlayer.path;
    const { headers } = ApiSettings.API_ENDPOINTS.createPlayer;
    const body = JSON.stringify(playerObj);
    return playersHttpClient.createOne(url, headers, body);
  }

  static async deletePlayer(id: number): Promise<object | null> {
    const url = API_URL + ApiSettings.API_ENDPOINTS.deletePlayer.path + id;
    return playersHttpClient.deleteOne(url);
  }

  static async updatePlayer(id: number, playerObj: Omit<Player, 'id'>): Promise<Player | null> {
    const url = API_URL + ApiSettings.API_ENDPOINTS.updatePlayer.path + id;
    const { headers } = ApiSettings.API_ENDPOINTS.updatePlayer;
    const body = JSON.stringify(playerObj);
    return playersHttpClient.updateOne(url, headers, body);
  }

  static async getHighscores(
    pageLimit?: string | null,
    page?: string | null,
    sort?: 'wins' | null,
    order?: 'ASC' | 'DESC' | null
  ): Promise<HighscoresData | null> {
    const queryOptions = [
      {
        key: ApiSettings.API_ENDPOINTS.getHighscores.query.limit,
        value: pageLimit,
      },
      {
        key: ApiSettings.API_ENDPOINTS.getHighscores.query.page,
        value: page,
      },
      {
        key: ApiSettings.API_ENDPOINTS.getHighscores.query.sort,
        value: sort,
      },
      {
        key: ApiSettings.API_ENDPOINTS.getHighscores.query.order,
        value: order,
      },
    ];

    const queryString = Loader.generateQueryString(queryOptions);
    const url = API_URL + ApiSettings.API_ENDPOINTS.getHighscores.path + queryString;
    return highscoresHttpClient.getAll(url);
  }

  static async getHighscore(id: number): Promise<Highscore | null> {
    const url = API_URL + ApiSettings.API_ENDPOINTS.getHighscore.path + id;
    return highscoresHttpClient.getOne(url);
  }

  static async createHighscore(highscoreObj: Highscore): Promise<Highscore | null> {
    const url = API_URL + ApiSettings.API_ENDPOINTS.createHighscore.path;
    const { headers } = ApiSettings.API_ENDPOINTS.createHighscore;
    const body = JSON.stringify(highscoreObj);
    return highscoresHttpClient.createOne(url, headers, body);
  }

  static async updateHighscore(id: number, highscoreObj: Omit<Highscore, 'id'>): Promise<Highscore | null> {
    const url = API_URL + ApiSettings.API_ENDPOINTS.updateHighscore.path + id;
    const { headers } = ApiSettings.API_ENDPOINTS.updateHighscore;
    const body = JSON.stringify(highscoreObj);
    return highscoresHttpClient.updateOne(url, headers, body);
  }

  static async deleteHighscore(id: number): Promise<object | null> {
    const url = API_URL + ApiSettings.API_ENDPOINTS.deleteHighscore.path + id;
    return highscoresHttpClient.deleteOne(url);
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

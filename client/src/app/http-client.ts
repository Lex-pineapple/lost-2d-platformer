import {
 HttpMethod, Player, Highscore, PlayersData, HighscoresData,
} from './types';

enum HttpStatusCode {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  ACCEPTED = 202,
  INTERNAL_SERVER_ERROR = 500,
}

type HttpHeaders = { [key: string]: string };
type ResponsePlayerData = PlayersData | Player | null;
type ResponseHighscoresData = HighscoresData | Highscore | null;
type ResponseData = ResponsePlayerData | ResponseHighscoresData;
export type ResponseHandler = <T>(arg: T) => void;

interface HttpClient<T> {
  create: (url: string, headers: HttpHeaders, body: string) => T | null;
  get: (url: string, hasTotal: boolean) => T | null;
  update: (url: string, headers: HttpHeaders, body: string) => T | null;
  delete: (url: string) => object | null;
}

abstract class AppHttpClient implements HttpClient<Promise<ResponseData>> {
  async get<T>(url: string, hasTotal: boolean): Promise<T | null> {
    return this.checkResponse(async () => {
      const method = HttpMethod.GET;
      const response = await fetch(url, { method });
      return response;
    }, hasTotal);
  }

  async create<T>(url: string, headers: HttpHeaders, body: string): Promise<T | null> {
    return this.checkResponse(async () => {
      const method = HttpMethod.POST;
      const response = await fetch(url, { method, headers, body });
      return response;
    }, false, []);
  }

  async update<T>(
    url: string,
    headers: HttpHeaders,
    body: string
  ): Promise<T | null> {
    return this.checkResponse(async () => {
      const method = HttpMethod.PUT;
      const response = await fetch(url, { method, headers, body });
      return response;
    }, false);
  }

  async delete(url: string): Promise<object | null> {
    return this.checkResponse(async () => {
      const method = HttpMethod.DELETE;
      const response = await fetch(url, { method });
      return response;
    }, false);
  }

  async checkResponse<T>(
    call: () => Promise<Response>,
    hasTotal = false,
    errorTypes: HttpStatusCode[] = [HttpStatusCode.NOT_FOUND]
  ): Promise<T | null> {
    try {
      const response = await call();
      const newErrorTypes = [...errorTypes];
      newErrorTypes.push(HttpStatusCode.UNAUTHORIZED);

      if (!response.ok) {
        for (let i = 0; i < newErrorTypes.length; i += 1) {
          if (response.status === newErrorTypes[i]) {
            throw Error(`Sorry, but there is ${response.status} error: ${response.statusText}`);
          }
        }

        throw Error(response.statusText);
      }

      const data = await response.json();

      if (hasTotal) {
        const total = response.headers.get('X-Total-Count');
        return { data, total } as T;
      }

      return data as T;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }

      return null;
    }
  }
}

class PlayersHttpClient extends AppHttpClient {
  async getAll(url: string): Promise<PlayersData | null> {
    return super.get(url, true);
  }

  async getOne(url: string): Promise<Player | null> {
    return super.get(url, false);
  }

  async createOne(url: string, headers: HttpHeaders, body: string): Promise<Player | null> {
    return super.create(url, headers, body);
  }

  async updateOne(url: string, headers: HttpHeaders, body: string): Promise<Player | null> {
    return super.update(url, headers, body);
  }

  async deleteOne(url: string): Promise<object | null> {
    return super.delete(url);
  }
}

class HighscoresHttpClient extends AppHttpClient {
  async getAll(url: string): Promise<HighscoresData | null> {
    return super.get(url, true);
  }

  async getOne(url: string): Promise<Highscore | null> {
    return super.get(url, false);
  }

  async createOne(url: string, headers: HttpHeaders, body: string): Promise<Highscore | null> {
    return super.create(url, headers, body);
  }

  async updateOne(url: string, headers: HttpHeaders, body: string): Promise<Highscore | null> {
    return super.update(url, headers, body);
  }

  async deleteOne(url: string): Promise<object | null> {
    return super.delete(url);
  }
}

class FilesHttpClient extends AppHttpClient {
  async getFile(url: string): Promise<object | null> {
    return super.get(url, false);
  }
}

export const playersHttpClient = new PlayersHttpClient();
export const highscoresHttpClient = new HighscoresHttpClient();
export const filesHttpClient = new FilesHttpClient();

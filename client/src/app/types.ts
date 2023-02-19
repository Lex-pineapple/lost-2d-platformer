export enum ElementPosition {
  BEFORE_BEGIN = 'beforebegin',
  AFTER_BEGIN = 'afterbegin',
  BEFORE_END = 'beforeend',
  AFTER_END = 'afterend',
}

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT',
  PATCH = 'PATCH',
}

export type Player = {
  name: string;
  email: string;
  password: string;
  score: number;
  livesLeft: number;
  lastLevel: number;
  id: number;
};

export type Highscore = {
  score: number;
  livesLeft: number;
  id: number;
};

export type PlayersData = {
  data: Player[];
  total?: string | null;
};

export type HighscoresData = {
  data: Highscore[];
  total?: string | null;
};

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
  masterVolume: number;
  musicVolume: number;
  effectsVolume: number;
  lang: 'en' | 'ru';
  id: number;
};

export type PlayerLoginKeys = 'email' | 'password';
export type PlayerSignupKeys = 'name' | 'email' | 'password';

export type Highscore = {
  highscore: number;
  playerId: number;
  player: {
    name: string
  }
  id: number;
};

export type PlayersData = {
  data: Player[];
  total?: string | null;
};

// export type HighscoresData = {
//   data: Highscore[];
//   total?: string | null;
// };

export type HighscoresData = Highscore[];

export type AuthData = {
  token: string;
};

export type AuthVerificationData = {
  result: boolean;
  playerId?: number;
  playerName?: string;
};

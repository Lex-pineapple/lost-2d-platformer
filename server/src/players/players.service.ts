import { Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { PatchPlayerDto } from './dto/patch-player.dto';
import { PlayerModel } from './player.model/player.model';

@Injectable()
export class PlayersService {
  private players: PlayerModel[] = [
    { id: '1', name: 'Player 1', score: 500, livesLeft: 2, lastLevel: 2 },
    { id: '2', name: 'Player 2', score: 450, livesLeft: 2, lastLevel: 2 },
    { id: '3', name: 'Player 3', score: 400, livesLeft: 2, lastLevel: 2 },
    { id: '4', name: 'Player 4', score: 350, livesLeft: 2, lastLevel: 2 },
    { id: '5', name: 'Player 5', score: 300, livesLeft: 2, lastLevel: 2 },
  ];

  async create(dto: CreatePlayerDto) {
    const playerObj = { id: Math.trunc(Math.random() * 100000).toString(), ...dto };
    this.players.push(playerObj);
    return this.players[this.players.length - 1];
  }

  async findById(id: string) {
    return this.players.find((player) => player.id === id);
  }

  async getAll() {
    return [...this.players];
  }

  async updateById(id: string, dto: CreatePlayerDto) {
    const playerIndex = this.players.findIndex((player) => player.id === id);

    if (playerIndex >= 0) {
      this.players[playerIndex] = { ...this.players[playerIndex], ...dto };
      return { ...this.players[playerIndex] };
    } else {
      return null;
    }
  }

  async patchById(id: string, dto: PatchPlayerDto) {
    const playerIndex = this.players.findIndex((player) => player.id === id);

    if (playerIndex >= 0) {
      this.players[playerIndex] = { ...this.players[playerIndex], ...dto };
      return { ...this.players[playerIndex] };
    } else {
      return null;
    }
  }

  async deleteById(id: string) {
    const playerIndex = this.players.findIndex((player) => player.id === id);

    if (playerIndex >= 0) {
      return this.players.splice(playerIndex, 1);
    } else {
      return null;
    }
  }
}

import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PlayersService } from 'src/players/players.service';
import { CreatePlayerDto } from '../players/dto/create-player.dto';
import { AuthPlayerDto } from './dto/auth-player.dto';
import * as argon from 'argon2';
import { AUTH_CREATION_ERROR, AUTH_UNAUTHORIZED_ERROR } from './auth.constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private playerService: PlayersService, private jwtService: JwtService) {}

  async login(dto: AuthPlayerDto) {
    const player = await this.playerService.findByEmail(dto.email);
    let isPasswordValid = false;

    if (player) {
      isPasswordValid = await argon.verify(player.password, dto.password);
    }

    if (player && isPasswordValid) {
      return this.signToken(player.id, player.email, player.name);
    }

    throw new UnauthorizedException(AUTH_UNAUTHORIZED_ERROR);
  }

  async signup(dto: CreatePlayerDto) {
    const createdPlayer = await this.playerService.create(dto);

    if (!createdPlayer) {
      throw new NotFoundException(AUTH_CREATION_ERROR);
    }

    return this.signToken(createdPlayer.id, createdPlayer.email, createdPlayer.name);
  }

  async signToken(id: number, email: string, name: string) {
    const payload = { sub: id, email, name };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  verifyToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token);
      return { result: true, playerId: decoded.sub, playerName: decoded.name };
    } catch {
      return { result: false };
    }
  }
}

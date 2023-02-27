import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UniqueConstraintError } from 'sequelize';
import { CreatePlayerDto } from './dto/create-player.dto';
import { PatchPlayerDto } from './dto/patch-player.dto';
import { PlayerModel } from './player.model/player.model';
import { PLAYER_DUPLICATE_ERROR } from './players.constants';
import * as argon from 'argon2';

@Injectable()
export class PlayersService {
  constructor(@InjectModel(PlayerModel) private playerRepository: typeof PlayerModel) {}

  async create(dto: CreatePlayerDto): Promise<Omit<PlayerModel, 'password'>> {
    try {
      const hash = await argon.hash(dto.password);

      const dtoWithHashedPwd = {
        name: dto.name,
        email: dto.email,
        password: hash,
      };

      const player = await this.playerRepository.create(dtoWithHashedPwd);

      return player;
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        throw new ConflictException(PLAYER_DUPLICATE_ERROR);
      }

      throw error;
    }
  }

  async findById(id: number): Promise<PlayerModel | null> {
    return this.playerRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<PlayerModel | null> {
    return this.playerRepository.findOne({ where: { email } });
  }

  async getAll(): Promise<PlayerModel[]> {
    return this.playerRepository.findAll();
  }

  async updateById(id: number, dto: CreatePlayerDto): Promise<PlayerModel | null> {
    const player = await this.playerRepository.findOne({ where: { id } });

    if (player) {
      return await player.update(dto);
    } else {
      return null;
    }
  }

  async patchById(id: number, dto: PatchPlayerDto): Promise<PlayerModel | null> {
    const player = await this.playerRepository.findOne({ where: { id } });

    if (player) {
      return await player.update(dto);
    } else {
      return null;
    }
  }

  async deleteById(id: number): Promise<boolean> {
    const result = await this.playerRepository.destroy({ where: { id } });
    return result > 0;
  }
}

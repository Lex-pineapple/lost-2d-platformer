import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePlayerDto } from './dto/create-player.dto';
import { PatchPlayerDto } from './dto/patch-player.dto';
import { PlayerModel } from './player.model/player.model';

@Injectable()
export class PlayersService {
  constructor(@InjectModel(PlayerModel) private playerRepository: typeof PlayerModel) {}

  async create(dto: CreatePlayerDto): Promise<PlayerModel> {
    const player = await this.playerRepository.create(dto);
    return player;
  }

  async findById(id: string): Promise<PlayerModel | null> {
    return this.playerRepository.findOne({ where: { id } });
  }

  async getAll(): Promise<PlayerModel[]> {
    return this.playerRepository.findAll();
  }

  async updateById(id: string, dto: CreatePlayerDto): Promise<PlayerModel | null> {
    const player = await this.playerRepository.findOne({ where: { id } });

    if (player) {
      return await player.update(dto);
    } else {
      return null;
    }
  }

  async patchById(id: string, dto: PatchPlayerDto): Promise<PlayerModel | null> {
    const player = await this.playerRepository.findOne({ where: { id } });

    if (player) {
      return await player.update(dto);
    } else {
      return null;
    }
  }

  async deleteById(id: string): Promise<boolean> {
    const result = await this.playerRepository.destroy({ where: { id } });
    return result > 0;
  }
}

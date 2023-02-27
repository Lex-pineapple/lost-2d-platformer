import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { HighscoreModel } from './highscore.model/highscore.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateHighscoreDto } from './dto/create-highscore.dto';
import { PatchHighscoreDto } from './dto/patch-highscore.dto';
import { FindOptions, UniqueConstraintError } from 'sequelize';
import {
  HIGHSCORE_DUPLICATE_ERROR,
  HIGHSCORE_NOT_FOUND_ERROR,
  HIGHSCORE_PLAYER_NOT_FOUND_ERROR,
} from './highscores.constants';
import { PlayersService } from 'src/players/players.service';
import { PlayerModel } from '../players/player.model/player.model';

@Injectable()
export class HighscoresService {
  constructor(
    @InjectModel(HighscoreModel) private highscoreRepository: typeof HighscoreModel,
    private playersService: PlayersService
  ) {}

  async addHighscore(dto: CreateHighscoreDto): Promise<HighscoreModel> {
    try {
      const player = await this.playersService.findById(dto.playerId);

      if (!player) {
        throw new NotFoundException(HIGHSCORE_PLAYER_NOT_FOUND_ERROR);
      }

      const highscore = await this.highscoreRepository.create(dto);

      return highscore;
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        throw new ConflictException(HIGHSCORE_DUPLICATE_ERROR);
      }

      throw error;
    }
  }

  async getHighscores(limit?: number): Promise<HighscoreModel[]> {
    const options: FindOptions<HighscoreModel> = {
      order: [['highscore', 'DESC']],
      include: [
        {
          model: PlayerModel,
          attributes: ['name'],
        },
      ],
    };

    if (limit) {
      options.limit = limit;
    }

    return this.highscoreRepository.findAll(options);
  }

  async findByPlayerId(playerId: number): Promise<HighscoreModel | null> {
    return this.highscoreRepository.findOne({ where: { playerId } });
  }

  async patchByPlayerId(playerId: number, dto: PatchHighscoreDto): Promise<HighscoreModel | null> {
    const player = await this.playersService.findById(playerId);

    if (!player) {
      throw new NotFoundException(HIGHSCORE_PLAYER_NOT_FOUND_ERROR);
    }

    const highscoreByPlayerId = await this.findByPlayerId(playerId);

    if (!highscoreByPlayerId) {
      throw new NotFoundException(HIGHSCORE_NOT_FOUND_ERROR);
    }

    return await highscoreByPlayerId.update(dto);
  }

  async deleteByPlayerId(playerId: number): Promise<boolean> {
    const result = await this.highscoreRepository.destroy({ where: { playerId } });
    return result > 0;
  }
}

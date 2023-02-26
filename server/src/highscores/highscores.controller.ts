import { Body, Controller, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { CreateHighscoreDto } from './dto/create-highscore.dto';
import { HIGHSCORE_CREATION_ERROR, HIGHSCORE_UPDATE_ERROR } from './highscores.constants';
import { HighscoreModel } from './highscore.model/highscore.model';
import { HighscoresService } from './highscores.service';
import { PatchHighscoreDto } from './dto/patch-highscore.dto';

@Controller('highscores')
export class HighscoresController {
  constructor(private readonly highscoresService: HighscoresService) {}

  @Post()
  async addHighscore(@Body() dto: CreateHighscoreDto) {
    const createdHighscore = await this.highscoresService.addHighscore(dto);

    if (!createdHighscore) {
      throw new NotFoundException(HIGHSCORE_CREATION_ERROR);
    }

    return createdHighscore;
  }

  @Get(':limit?')
  async getHighscores(@Param('limit') limit?: number): Promise<HighscoreModel[]> {
    const highscores = this.highscoresService.getHighscores(limit);
    return highscores;
  }

  @Patch(':playerId')
  async patchHighscore(
    @Param('playerId') playerId: number,
    @Body() highscoreData: PatchHighscoreDto
  ): Promise<HighscoreModel> {
    const patchedHighscore = await this.highscoresService.patchByPlayerId(playerId, highscoreData);

    if (!patchedHighscore) {
      throw new NotFoundException(HIGHSCORE_UPDATE_ERROR);
    }

    return patchedHighscore;
  }
}

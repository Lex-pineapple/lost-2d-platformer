import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateHighscoreDto } from './dto/create-highscore.dto';
import {
  HIGHSCORE_CREATION_ERROR,
  HIGHSCORE_NOT_FOUND_ERROR,
  HIGHSCORE_UPDATE_ERROR,
} from './highscores.constants';
import { HighscoreModel } from './highscore.model/highscore.model';
import { HighscoresService } from './highscores.service';
import { PatchHighscoreDto } from './dto/patch-highscore.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Highscores')
@Controller('highscores')
export class HighscoresController {
  constructor(private readonly highscoresService: HighscoresService) {}

  @ApiOperation({ summary: 'Player highscores' })
  @ApiResponse({ status: 200, type: HighscoreModel })
  @Post()
  async addHighscore(@Body() dto: CreateHighscoreDto) {
    const createdHighscore = await this.highscoresService.addHighscore(dto);

    if (!createdHighscore) {
      throw new NotFoundException(HIGHSCORE_CREATION_ERROR);
    }

    return createdHighscore;
  }

  @ApiOperation({ summary: 'Get all highscores' })
  @ApiResponse({ status: 200, type: [HighscoreModel] })
  @Get()
  async getHighscores(): Promise<HighscoreModel[]> {
    const highscores = this.highscoresService.getHighscores();
    return highscores;
  }

  @ApiOperation({ summary: 'Get highscore record by Player id' })
  @ApiResponse({ status: 200, type: HighscoreModel })
  @Get(':playerId')
  async getHighscore(@Param('playerId') playerId: number): Promise<HighscoreModel> {
    const highscore = await this.highscoresService.findByPlayerId(playerId);

    if (!highscore) {
      throw new NotFoundException(HIGHSCORE_NOT_FOUND_ERROR);
    }

    return highscore;
  }

  @ApiOperation({ summary: 'Update highscore record by player id' })
  @ApiResponse({ status: 200, type: HighscoreModel })
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

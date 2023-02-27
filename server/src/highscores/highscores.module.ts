import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HighscoreModel } from './highscore.model/highscore.model';
import { PlayersModule } from '../players/players.module';
import { HighscoresController } from './highscores.controller';
import { HighscoresService } from './highscores.service';

@Module({
  controllers: [HighscoresController],
  providers: [HighscoresService],
  imports: [SequelizeModule.forFeature([HighscoreModel]), PlayersModule],
})
export class HighscoresModule {}

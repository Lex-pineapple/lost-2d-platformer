import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { PlayerModel } from './player.model/player.model';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';

@Module({
  controllers: [PlayersController],
  providers: [PlayersService],
  imports: [SequelizeModule.forFeature([PlayerModel]), forwardRef(() => AuthModule)],
  exports: [PlayersService],
})
export class PlayersModule {}

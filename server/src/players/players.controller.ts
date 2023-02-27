import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PLAYER_CREATION_ERROR, PLAYER_NOT_FOUND_ERROR } from './players.constants';
import { PlayerModel } from './player.model/player.model';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { PatchPlayerDto } from './dto/patch-player.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PutPlayerDto } from './dto/put-player.dto';
import { JwtAuthGuard } from 'src/auth/strategy/jwt-auth.guard';

@ApiTags('Players')
@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @ApiOperation({ summary: 'Player creation' })
  @ApiResponse({ status: 200, type: PlayerModel })
  @Post()
  async create(@Body() dto: CreatePlayerDto) {
    const createdPlayer = await this.playersService.create(dto);

    if (!createdPlayer) {
      throw new NotFoundException(PLAYER_CREATION_ERROR);
    }

    return createdPlayer;
  }

  @ApiOperation({ summary: 'Get all players' })
  @ApiResponse({ status: 200, type: [PlayerModel] })
  @UseGuards(JwtAuthGuard)
  @Get()
  async getPlayers(): Promise<PlayerModel[]> {
    const players = await this.playersService.getAll();
    return players;
  }

  @ApiOperation({ summary: 'Get one player by id' })
  @ApiResponse({ status: 200, type: PlayerModel })
  @Get(':id')
  async getPlayer(@Param('id') id: number): Promise<PlayerModel> {
    const player = await this.playersService.findById(id);

    if (!player) {
      throw new NotFoundException(PLAYER_NOT_FOUND_ERROR);
    }

    return player;
  }

  @ApiOperation({ summary: 'Put full player info by player id' })
  @ApiResponse({ status: 200, type: PlayerModel })
  @Put(':id')
  async updatePlayer(
    @Param('id') id: number,
    @Body() playerData: PutPlayerDto
  ): Promise<PlayerModel> {
    const updatedPlayer = await this.playersService.updateById(id, playerData);

    if (!updatedPlayer) {
      throw new NotFoundException(PLAYER_NOT_FOUND_ERROR);
    }

    return updatedPlayer;
  }

  @ApiOperation({ summary: 'Rewrite partial player info by player id' })
  @ApiResponse({ status: 200, type: PlayerModel })
  @Patch(':id')
  async patchPlayer(
    @Param('id') id: number,
    @Body() playerData: PatchPlayerDto
  ): Promise<PlayerModel> {
    const patchedPlayer = await this.playersService.patchById(id, playerData);

    if (!patchedPlayer) {
      throw new NotFoundException(PLAYER_NOT_FOUND_ERROR);
    }

    return patchedPlayer;
  }

  @ApiOperation({ summary: 'Delete player by id' })
  @ApiResponse({ status: 200, type: PlayerModel })
  @Delete(':id')
  async delete(@Param('id') id: number) {
    const deletedPlayer = await this.playersService.deleteById(id);

    if (!deletedPlayer) {
      throw new NotFoundException(PLAYER_NOT_FOUND_ERROR);
    }
  }
}

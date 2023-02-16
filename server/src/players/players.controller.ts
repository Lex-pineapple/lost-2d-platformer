import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import {
  PLAYER_CREATION_ERROR,
  PLAYER_INVALID_DATA_ERROR,
  PLAYER_NOT_FOUND_ERROR,
} from './players.constants';
import { PlayerModel } from './player.model/player.model';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { validate } from 'class-validator';
import { instanceToPlain, plainToClass } from 'class-transformer';
import { PatchPlayerDto } from './dto/patch-player.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PutPlayerDto } from './dto/put-player.dto';

@ApiTags('Players')
@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @ApiOperation({ summary: 'Player creation' })
  @ApiResponse({ status: 200, type: PlayerModel })
  @Post()
  async create(@Body() dto: CreatePlayerDto) {
    const data = plainToClass(CreatePlayerDto, dto);
    const errors = await validate(data, {
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      skipMissingProperties: false,
    });

    if (errors.length > 0) {
      throw new BadRequestException(PLAYER_INVALID_DATA_ERROR);
    }

    const dataAsPlain = instanceToPlain(data) as CreatePlayerDto;

    const createdPlayer = await this.playersService.create(dataAsPlain);

    if (!createdPlayer) {
      throw new NotFoundException(PLAYER_CREATION_ERROR);
    }

    return createdPlayer;
  }

  @ApiOperation({ summary: 'Get all players' })
  @ApiResponse({ status: 200, type: [PlayerModel] })
  @Get()
  async getPlayers(): Promise<PlayerModel[]> {
    const players = await this.playersService.getAll();
    return players;
  }

  @ApiOperation({ summary: 'Get one player by id' })
  @ApiResponse({ status: 200, type: PlayerModel })
  @Get(':id')
  async getPlayer(@Param('id') id: string): Promise<PlayerModel> {
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
    @Param('id') id: string,
    @Body() playerData: PutPlayerDto
  ): Promise<PlayerModel> {
    const data = plainToClass(PutPlayerDto, playerData);
    const errors = await validate(data, {
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      skipMissingProperties: false,
    });

    if (errors.length > 0) {
      throw new BadRequestException(PLAYER_INVALID_DATA_ERROR);
    }

    const dataAsPlain = instanceToPlain(data) as PutPlayerDto;

    const updatedPlayer = await this.playersService.updateById(id, dataAsPlain);

    if (!updatedPlayer) {
      throw new NotFoundException(PLAYER_NOT_FOUND_ERROR);
    }

    return updatedPlayer;
  }

  @ApiOperation({ summary: 'Rewrite partial player info by player id' })
  @ApiResponse({ status: 200, type: PlayerModel })
  @Patch(':id')
  async patchPlayer(
    @Param('id') id: string,
    @Body() playerData: PatchPlayerDto
  ): Promise<PlayerModel> {
    const data = plainToClass(PatchPlayerDto, playerData);
    const errors = await validate(data, { whitelist: true, skipMissingProperties: true });

    if (errors.length > 0) {
      throw new BadRequestException(PLAYER_INVALID_DATA_ERROR);
    }

    const dataAsPlain = instanceToPlain(data);

    const patchedPlayer = await this.playersService.patchById(id, dataAsPlain);

    if (!patchedPlayer) {
      throw new NotFoundException(PLAYER_NOT_FOUND_ERROR);
    }

    return patchedPlayer;
  }

  @ApiOperation({ summary: 'Delete player by id' })
  @ApiResponse({ status: 200, type: PlayerModel })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedPlayer = await this.playersService.deleteById(id);

    if (!deletedPlayer) {
      throw new NotFoundException(PLAYER_NOT_FOUND_ERROR);
    }
  }
}

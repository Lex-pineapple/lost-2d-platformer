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
import { PLAYER_INVALID_DATA_ERROR, PLAYER_NOT_FOUND_ERROR } from './players.constants';
import { PlayerModel } from './player.model/player.model';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { validate } from 'class-validator';
import { instanceToPlain, plainToClass } from 'class-transformer';
import { PatchPlayerDto } from './dto/patch-player.dto';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

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
      throw new NotFoundException(PLAYER_NOT_FOUND_ERROR);
    }

    return createdPlayer;
  }

  @Get()
  async getPlayers(): Promise<PlayerModel[]> {
    const players = await this.playersService.getAll();
    return players;
  }

  @Get(':id')
  async getPlayer(@Param('id') id: string): Promise<PlayerModel> {
    const player = await this.playersService.findById(id);

    if (!player) {
      throw new NotFoundException(PLAYER_NOT_FOUND_ERROR);
    }

    return player;
  }

  @Put(':id')
  async updatePlayer(
    @Param('id') id: string,
    @Body() playerData: CreatePlayerDto
  ): Promise<PlayerModel> {
    const data = plainToClass(CreatePlayerDto, playerData);
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

    const updatedPlayer = await this.playersService.updateById(id, dataAsPlain);

    if (!updatedPlayer) {
      throw new NotFoundException(PLAYER_NOT_FOUND_ERROR);
    }

    return updatedPlayer;
  }

  @Patch(':id')
  // @UsePipes(new ValidationPipe({ whitelist: true }))
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

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedPlayer = await this.playersService.deleteById(id);

    if (!deletedPlayer) {
      throw new NotFoundException(PLAYER_NOT_FOUND_ERROR);
    }
  }
}

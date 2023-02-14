import { IsString, IsNumber } from 'class-validator';

export class CreatePlayerDto {
  @IsString()
  name: string;

  @IsNumber()
  score: number;

  @IsNumber()
  livesLeft: number;

  @IsNumber()
  lastLevel: number;
}

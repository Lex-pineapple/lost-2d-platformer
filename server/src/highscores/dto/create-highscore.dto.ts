import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateHighscoreDto {
  @ApiProperty({ example: '500', description: 'Player win score' })
  @IsNumber()
  @IsNotEmpty()
  readonly highscore: number;

  @ApiProperty({ example: '11', description: 'Unique player identifier' })
  @IsNumber()
  @IsNotEmpty()
  readonly playerId: number;
}

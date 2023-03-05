import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty } from 'class-validator';

export class PatchHighscoreDto {
  @ApiProperty({ example: '500', description: 'Player win score' })
  @IsNumber()
  @IsNotEmpty()
  readonly highscore: number;
}

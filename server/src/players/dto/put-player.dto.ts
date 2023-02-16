import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class PutPlayerDto {
  @ApiProperty({ example: 'Player 1', description: 'Player name' })
  @IsString()
  readonly name: string;

  @ApiProperty({ example: 'email@site.com', description: 'Unique email' })
  @IsString()
  readonly email: string;

  @ApiProperty({ example: '12345', description: 'Password' })
  @IsString()
  readonly password: string;

  @ApiProperty({ example: '300', description: 'Player score, default – 0' })
  @IsNumber()
  readonly score: number;

  @ApiProperty({ example: '2', description: 'Lives left, default – 3' })
  @IsNumber()
  readonly livesLeft: number;

  @ApiProperty({ example: '3', description: 'Last level, default – 1' })
  @IsNumber()
  readonly lastLevel: number;
}

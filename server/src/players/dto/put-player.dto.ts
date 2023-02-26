import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty, MinLength } from 'class-validator';

export class PutPlayerDto {
  @ApiProperty({ example: 'Player 1', description: 'Player name' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: 'email@site.com', description: 'Unique email' })
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ example: '12345', description: 'Password' })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  readonly password: string;

  @ApiProperty({ example: '300', description: 'Player score, default – 0' })
  @IsNumber()
  @IsNotEmpty()
  readonly score: number;

  @ApiProperty({ example: '2', description: 'Lives left, default – 3' })
  @IsNumber()
  @IsNotEmpty()
  readonly livesLeft: number;

  @ApiProperty({ example: '3', description: 'Last level, default – 1' })
  @IsNumber()
  @IsNotEmpty()
  readonly lastLevel: number;

  @ApiProperty({ example: '0.5', description: 'Player master volume, default – 0.5' })
  @IsNumber()
  @IsNotEmpty()
  readonly masterVolume: number;

  @ApiProperty({ example: '0.5', description: 'Player music volume, default – 0.5' })
  @IsNumber()
  @IsNotEmpty()
  readonly musicVolume: number;

  @ApiProperty({ example: '0.5', description: 'Player effects volume, default – 0.5' })
  @IsNumber()
  @IsNotEmpty()
  readonly effectsVolume: number;

  @ApiProperty({ example: 'en', description: 'Lang – en or ru' })
  @IsString()
  @IsNotEmpty()
  readonly lang: string;
}

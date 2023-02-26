import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class PatchPlayerDto {
  @ApiProperty({ example: 'Player 1', description: 'Player name' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiProperty({ example: 'email@site.com', description: 'Unique email' })
  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  email?: string;

  @ApiProperty({ example: '12345', description: 'Password' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  password?: string;

  @ApiProperty({ example: '300', description: 'Player score, default – 0' })
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  score?: number;

  @ApiProperty({ example: '2', description: 'Lives left, default – 3' })
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  livesLeft?: number;

  @ApiProperty({ example: '3', description: 'Last level, default – 1' })
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  lastLevel?: number;

  @ApiProperty({ example: '0.5', description: 'Player master volume, default – 0.5' })
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  masterVolume?: number;

  @ApiProperty({ example: '0.5', description: 'Player music volume, default – 0.5' })
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  musicVolume?: number;

  @ApiProperty({ example: '0.5', description: 'Player effects volume, default – 0.5' })
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  effectsVolume?: number;

  @ApiProperty({ example: 'en', description: 'Lang – en or ru' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  lang?: string;
}

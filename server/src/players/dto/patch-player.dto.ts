import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsEmail } from 'class-validator';

export class PatchPlayerDto {
  @ApiProperty({ example: 'Player 1', description: 'Player name' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 'email@site.com', description: 'Unique email' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: '12345', description: 'Password' })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({ example: '300', description: 'Player score, default – 0' })
  @IsOptional()
  @IsNumber()
  score?: number;

  @ApiProperty({ example: '2', description: 'Lives left, default – 3' })
  @IsOptional()
  @IsNumber()
  livesLeft?: number;

  @ApiProperty({ example: '3', description: 'Last level, default – 1' })
  @IsOptional()
  @IsNumber()
  lastLevel?: number;
}

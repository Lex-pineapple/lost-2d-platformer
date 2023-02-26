import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreatePlayerDto {
  @ApiProperty({ example: 'Player 1', description: 'Player name' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: 'email@site.com', description: 'Unique email' })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ example: '12345', description: 'Password' })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  readonly password: string;
}

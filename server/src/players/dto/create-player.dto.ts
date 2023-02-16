import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class CreatePlayerDto {
  @ApiProperty({ example: 'Player 1', description: 'Player name' })
  @IsString()
  readonly name: string;

  @ApiProperty({ example: 'email@site.com', description: 'Unique email' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: '12345', description: 'Password' })
  @IsString()
  readonly password: string;
}

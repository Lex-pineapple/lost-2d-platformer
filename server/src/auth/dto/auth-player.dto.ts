import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class AuthPlayerDto {
  @ApiProperty({ example: 'email@site.com', description: 'Unique email' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: '12345', description: 'Password' })
  @IsString()
  readonly password: string;
}

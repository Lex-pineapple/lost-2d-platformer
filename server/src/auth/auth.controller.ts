import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthPlayerDto } from './dto/auth-player.dto';
import { CreatePlayerDto } from '../players/dto/create-player.dto';
import { AuthService } from './auth.service';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() dto: AuthPlayerDto) {
    console.log(dto);
    return this.authService.login(dto);
  }

  @Post('/signup')
  signup(@Body() dto: CreatePlayerDto) {
    console.log(dto);
    return this.authService.signup(dto);
  }
}

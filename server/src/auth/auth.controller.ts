import { Body, Controller, Post, Req, } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthPlayerDto } from './dto/auth-player.dto';
import { CreatePlayerDto } from '../players/dto/create-player.dto';
import { AuthService } from './auth.service';
import { Request } from 'express';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() dto: AuthPlayerDto) {
    console.log(dto);
    return this.authService.login(dto);
  }

  @Post('signup')
  signup(@Body() dto: CreatePlayerDto) {
    console.log(dto);
    return this.authService.signup(dto);
  }

  @Post('verify')
  verifyToken(@Req() req: Request) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { result: false };
    }

    const token = authHeader.split(' ')[1];

    const tokenData = this.authService.verifyToken(token);

    if (tokenData.result) return tokenData;

    return { result: false };
  }
}

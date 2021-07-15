import { Body, Get, Req, Request } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { Controller, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../jwt.authGuard';
import { authService } from '../services/authService';

@Controller('auth')
export class AuthController {
  constructor(private authService: authService) {}

  @Post('/login')
  async login(@Body() user: any) {
    return await this.authService.login(user);
  }
  @UseGuards(JwtAuthGuard)
  @Get('/prueba')
  prueba(@Request() req) {
    return 'prueba';
  }
}

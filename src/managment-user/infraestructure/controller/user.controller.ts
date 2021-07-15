import { Body, Get, UseGuards } from '@nestjs/common';
import { Controller, Post } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.authGuard';
import { UserService } from '../../application/userService';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  async created(@Body() user: any) {
    return await this.userService.created(user);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  async list() {
    return await this.userService.list();
  }
  @UseGuards(JwtAuthGuard)
  @Post('/:id/update')
  async update(@Body() user: any) {
    return await this.userService.update(user);
  }
}

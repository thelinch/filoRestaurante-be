import { Body, Get } from '@nestjs/common';
import { Controller, Post } from '@nestjs/common';
import { UserService } from '../../application/userService';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  async created(@Body() user: any) {
    return await this.userService.created(user);
  }
  @Get()
  async list() {
    return await this.userService.list();
  }
  @Post('/:id/update')
  async update(@Body() user: any) {
    return await this.userService.update(user);
  }
}

import { Body, Get, UseGuards } from '@nestjs/common';
import { Controller, Post } from '@nestjs/common';
import { JwtAuthGuard } from '../../../auth/jwt.authGuard';
import { ActionRepository } from '../repository/ActionRepository';

@Controller('action')
export class ActionController {
  constructor(private actionRepository: ActionRepository) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  async created(@Body() role: any) {
    await this.actionRepository.save(role);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  async list() {
    return await this.actionRepository.list();
  }
  @UseGuards(JwtAuthGuard)
  @Post('/:id/update')
  async update(@Body() action: any) {
    await this.actionRepository.save(action);
  }
}

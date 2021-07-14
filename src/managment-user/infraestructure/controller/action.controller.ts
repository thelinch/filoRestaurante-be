import { Body, Get } from '@nestjs/common';
import { Controller, Post } from '@nestjs/common';
import { ActionRepository } from '../repository/ActionRepository';
import { RoleRepository } from '../repository/RoleRepository';

@Controller('action')
export class ActionController {
  constructor(private actionRepository: ActionRepository) {}
  @Post()
  async created(@Body() role: any) {
    await this.actionRepository.save(role);
  }
  @Get()
  async list() {
    return await this.actionRepository.list();
  }
  @Post('/:id/update')
  async update(@Body() action: any) {
    await this.actionRepository.save(action);
  }
}

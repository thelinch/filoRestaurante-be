import { Body, Get } from '@nestjs/common';
import { Controller, Post } from '@nestjs/common';
import { RoleRepository } from '../repository/RoleRepository';

@Controller('role')
export class RoleController {
  constructor(private roleRepository: RoleRepository) {}
  @Post()
  async created(@Body() role: any) {
    await this.roleRepository.save(role);
  }
  @Get()
  async list() {
    return await this.roleRepository.list();
  }
  @Post('/:id/update')
  async update(@Body() role: any) {
    await this.roleRepository.save(role);
  }
}

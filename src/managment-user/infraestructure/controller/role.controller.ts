import { Body, Get, UseGuards } from '@nestjs/common';
import { Controller, Post } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.authGuard';
import { RoleRepository } from '../repository/RoleRepository';

@Controller('role')
export class RoleController {
  constructor(private roleRepository: RoleRepository) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  async created(@Body() role: any) {
    await this.roleRepository.save(role);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  async list() {
    return await this.roleRepository.list();
  }
  @UseGuards(JwtAuthGuard)
  @Post('/:id/update')
  async update(@Body() role: any) {
    await this.roleRepository.save(role);
  }
}

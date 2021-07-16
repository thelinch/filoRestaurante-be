import { Body, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { JwtAuthGuard } from '../../../auth/jwt.authGuard';
import { TableService } from '../../application/TableService';
import { TableOrder } from '../../domain/Table';
import { TableBodyRequestDto } from '../../interface/dto/tableBodyRequestDto';

@Controller('tables')
export class TableOrderController {
  constructor(private tableService: TableService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() tableBodyRequestDto: TableBodyRequestDto) {
    const tableOrder = new TableOrder(tableBodyRequestDto);
    await this.tableService.create(tableOrder);
  }
  @UseGuards(JwtAuthGuard)
  @Post('/:id/update')
  async update(@Body() tableBodyRequestDto: TableBodyRequestDto) {
    const tableOrder = new TableOrder(tableBodyRequestDto);
    await this.tableService.update(tableOrder);
  }
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async delete(@Param('id') tableId: string) {
    await this.tableService.remove(tableId);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  async list() {
    return await this.tableService.list();
  }
}

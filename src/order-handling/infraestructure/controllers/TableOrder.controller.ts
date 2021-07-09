import { Body, Delete, Get, Param, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { TableService } from 'src/order-handling/application/TableService';
import { TableOrder } from 'src/order-handling/domain/Table';
import { TableBodyRequestDto } from 'src/order-handling/interface/dto/tableBodyRequestDto';

@Controller('tables')
export class TableOrderController {
  constructor(private tableService: TableService) {}

  @Post()
  async create(@Body() tableBodyRequestDto: TableBodyRequestDto) {
    const tableOrder = new TableOrder(tableBodyRequestDto);
    await this.tableService.create(tableOrder);
  }

  @Post('/:id/update')
  async update(@Body() tableBodyRequestDto: TableBodyRequestDto) {
    const tableOrder = new TableOrder(tableBodyRequestDto);
    await this.tableService.update(tableOrder);
  }

  @Delete('/:id')
  async delete(@Param('id') tableId: string) {
    await this.tableService.remove(tableId);
  }
  @Get()
  async list() {
    return await this.tableService.list();
  }
}

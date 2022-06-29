import { Body, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { TableBodyRequestDto } from '../../interface/dto/TableBodyRequestDto';
import { JwtAuthGuard } from '../../../auth/jwt.authGuard';
import { TableService } from '../../application/TableService';
import { TableOrder } from '../../domain/Table';
import { TypeOrderEntity } from '../entity/TypeOrderEntity';
import { TypeOrderRepository } from '../repository/TypeOrderRepository';
import { TypeOrder } from 'src/order-handling/domain/TypeOrder';

@Controller('typeOrders')
export class TypeOrderController {
  constructor(private TypeOrderRepository: TypeOrderRepository) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() typeOrder: { color: string; name: string; price: number },
  ) {
    await this.TypeOrderRepository.created(
      new TypeOrder({
        color: typeOrder.color,
        name: typeOrder.name,
        price: typeOrder.price,
      }),
    );
  }
  @UseGuards(JwtAuthGuard)
  @Post('/:id/update')
  async update(
    @Body()
    typeOrder: {
      color: string;
      name: string;
      id: string;
      price: number;
    },
  ) {
    await this.TypeOrderRepository.save({
      color: typeOrder.color,
      name: typeOrder.name,
      price: typeOrder.price,
      id: typeOrder.id,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async list() {
    return await this.TypeOrderRepository.list();
  }
}

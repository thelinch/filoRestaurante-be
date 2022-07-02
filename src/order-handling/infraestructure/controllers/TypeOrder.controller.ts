import { Body, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { JwtAuthGuard } from '../../../auth/jwt.authGuard';
import { TypeOrder } from '../../domain/TypeOrder';

import { TypeOrderRepository } from '../repository/TypeOrderRepository';

@Controller('typeOrders')
export class TypeOrderController {
  constructor(private TypeOrderRepository: TypeOrderRepository) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body()
    typeOrder: {
      color: string;
      name: string;
      price: number;
      localAttention: boolean;
    },
  ) {
    await this.TypeOrderRepository.created(
      new TypeOrder({
        color: typeOrder.color,
        name: typeOrder.name,
        price: typeOrder.price,
        localAttention: typeOrder.localAttention,
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
      localAttention: boolean;
    },
  ) {
    await this.TypeOrderRepository.save({
      color: typeOrder.color,
      name: typeOrder.name,
      price: typeOrder.price,
      id: typeOrder.id,
      localAttention: typeOrder.localAttention,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async list() {
    return await this.TypeOrderRepository.list();
  }
}

import { Body, Get, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { OrderService } from 'src/order-handling/application/OrderService';
import { Order } from 'src/order-handling/domain/Order';
import { OrderBodyRequestDto } from 'src/order-handling/interface/dto/OrderBodyRequestDto';

@Controller('orders')
export class OrderController {
  constructor(private OrderService: OrderService) {}
  @Post()
  created(@Body() orderBodyRequestDto: OrderBodyRequestDto) {
    const order = Order.create(orderBodyRequestDto);
    this.OrderService.create(order);
  }
}

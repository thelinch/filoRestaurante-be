import { Get } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { OrderService } from 'src/order-handling/application/OrderService';
import { Order } from 'src/order-handling/domain/Order';

@Controller('orders')
export class OrderController {
  constructor(private OrderService: OrderService) {}
  @Get()
  prueba() {
    const order = Order.create({
      id: 'wdwd',
      observation: null,
      orderDetails: [],
      resume: 'wwd',
      total: 22,
      state: 'wdwd',
      table: null,
    });
    this.OrderService.create(order);
  }
}

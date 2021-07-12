import { Body, Get, Param, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { OrderService } from 'src/order-handling/application/OrderService';
import { Category } from 'src/order-handling/domain/Category';
import { Order } from 'src/order-handling/domain/Order';
import { CategoryBodyRequestDto } from 'src/order-handling/interface/dto/CategoryBodyRequestDto';
import { OrderBodyRequestDto } from 'src/order-handling/interface/dto/OrderBodyRequestDto';

@Controller('orders')
export class OrderController {
  constructor(private OrderService: OrderService) {}
  @Post()
  async created(@Body() orderBodyRequestDto: OrderBodyRequestDto) {
    const order = Order.create(orderBodyRequestDto);
    console.log(
      'order',
      order.properties().orderDetails.map((o) => o.product.categories),
    );
    await this.OrderService.create(order);
  }
  @Get('/:id/payment')
  async payment(@Param('id') orderId: string) {
    await this.OrderService.payment(orderId);
  }
  @Post('/:id/update')
  update(@Body() orderBodyRequestDto: OrderBodyRequestDto) {
    const order = Order.create(orderBodyRequestDto);
    this.OrderService.update(order);
  }
  @Post('/categories/orders')
  async ordersForCategories(
    @Body() categoriesBodyRequestDto: CategoryBodyRequestDto[],
  ) {
    return this.OrderService.listForCategories(
      categoriesBodyRequestDto.map((c) => new Category(c)),
    );
  }
  @Get('/mesas/:tableId/orders')
  async listOrderForTable(@Param('tableId') tableId: string) {
    return await this.OrderService.listOrdersForTable(tableId);
  }
  @Get('/:id/reject')
  async reject(@Param('id') orderId: string) {
    await this.OrderService.reject(orderId);
  }
  @Get('/:id/remove')
  async remove(@Param('id') orderId: string) {
    await this.OrderService.reject(orderId);
  }
}

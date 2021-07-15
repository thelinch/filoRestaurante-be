import { Body, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt.authGuard';
import { OrderService } from 'src/order-handling/application/OrderService';
import { Category } from 'src/order-handling/domain/Category';
import { Order } from 'src/order-handling/domain/Order';
import { CategoryBodyRequestDto } from 'src/order-handling/interface/dto/CategoryBodyRequestDto';
import { OrderBodyRequestDto } from 'src/order-handling/interface/dto/OrderBodyRequestDto';

@Controller('orders')
export class OrderController {
  constructor(private OrderService: OrderService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  async created(@Body() orderBodyRequestDto: OrderBodyRequestDto, @Req() req) {
    console.log("u",req.user)
    orderBodyRequestDto.user = req.user;
    const order = Order.create(orderBodyRequestDto);
    await this.OrderService.create(order);
  }
  @Post('/product/mostSales')
  async productMusSales(@Req() req: Request) {
    return await this.OrderService.productMostSales(req.body);
  }
  @Get('/user/valorations')
  async valoration() {
    return await this.OrderService.getValorationNumericToUserInTodayForOrders();
  }
  @Get('/sumSalesToday')
  async sumTotalSalesInToday() {
    return await this.OrderService.sumTotalSalesInToday();
  }
  @Post('/payment')
  async payment(@Body() orders: OrderBodyRequestDto[]) {
    const ordersDomain = orders.map((o) => Order.create(o));
    await this.OrderService.payments(ordersDomain);
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
  @Get('/:id/inProgress')
  async inProgress(@Param('id') orderId: string) {
    return await this.OrderService.inProgress(orderId);
  }
  @Get('/:id/reject')
  async reject(@Param('id') orderId: string) {
    await this.OrderService.reject(orderId);
  }
  @Get('/:id/remove')
  async remove(@Param('id') orderId: string) {
    await this.OrderService.reject(orderId);
  }
  @Get('/:id/attend')
  async attend(@Param('id') orderId: string) {
    await this.OrderService.attended(orderId);
  }
}

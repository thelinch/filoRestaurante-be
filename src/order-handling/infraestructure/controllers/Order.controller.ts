import { Body, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthGuard } from '../../../auth/jwt.authGuard';
import { OrderService } from '../../application/OrderService';
import { Category } from '../../domain/Category';
import { Order } from '../../domain/Order';
import { CategoryBodyRequestDto } from '../../interface/dto/CategoryBodyRequestDto';
import { OrderBodyRequestDto } from '../../interface/dto/OrderBodyRequestDto';

@Controller('orders')
export class OrderController {
  constructor(private OrderService: OrderService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  async created(
    @Body() orderBodyRequestDto: OrderBodyRequestDto,
    @Req() req,
    @Res() res: Response,
  ) {
    orderBodyRequestDto.user = req.user;
    const order = req.body;
    /* const order = Order.create(orderBodyRequestDto); */
    await this.OrderService.create(order);
    res.send({ codigo: order.Code });
  }
  @UseGuards(JwtAuthGuard)
  @Post('/product/mostSales')
  async productMusSales(@Req() req: Request) {
    return await this.OrderService.productMostSales(req.body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user/valorations')
  async valoration() {
    return await this.OrderService.getValorationNumericToUserInTodayForOrders();
  }
  @UseGuards(JwtAuthGuard)
  @Get('/sumSalesToday')
  async sumTotalSalesInToday() {
    return await this.OrderService.sumTotalSalesInToday();
  }
  @UseGuards(JwtAuthGuard)
  @Get('/states')
  async getStates() {
    return await this.OrderService.getStates();
  }
  @UseGuards(JwtAuthGuard)
  @Post('/payment')
  async payment(@Body() orders: OrderBodyRequestDto[]) {
    const ordersDomain = orders.map((o) => Order.create(o));
    await this.OrderService.payments(ordersDomain);
  }
  @UseGuards(JwtAuthGuard)
  @Post('/:id/update')
  update(@Body() orderBodyRequestDto: OrderBodyRequestDto) {
    const order = Order.create(orderBodyRequestDto);
    this.OrderService.update(order);
  }
  @UseGuards(JwtAuthGuard)
  @Post('/categories/orders')
  async ordersForCategories(
    @Body() categoriesBodyRequestDto: CategoryBodyRequestDto[],
  ) {
    return this.OrderService.listForCategories(
      categoriesBodyRequestDto.map((c) => new Category(c)),
    );
  }
  @UseGuards(JwtAuthGuard)
  @Get('/mesas/:tableId/orders')
  async listOrderForTable(@Param('tableId') tableId: string) {
    return await this.OrderService.listOrdersForTable(tableId);
  }
  @UseGuards(JwtAuthGuard)
  @Get('/:id/inProgress')
  async inProgress(@Param('id') orderId: string) {
    return await this.OrderService.inProgress(orderId);
  }
  @UseGuards(JwtAuthGuard)
  @Get('/:id/reject')
  async reject(@Param('id') orderId: string) {
    await this.OrderService.reject(orderId);
  }
  @UseGuards(JwtAuthGuard)
  @Get('/:id/remove')
  async remove(@Param('id') orderId: string) {
    await this.OrderService.reject(orderId);
  }
  @UseGuards(JwtAuthGuard)
  @Get('/:id/attend')
  async attend(@Param('id') orderId: string) {
    await this.OrderService.attended(orderId);
  }
}

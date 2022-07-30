import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GenerateUuidShortUuid } from '../shared/infraestructure/generateCodeShortUuid';
import { OrderAttendedHandler } from './application/events/OrderAttendedHandler';
import { OrderCreatedHandler } from './application/events/OrderCreatedHandler';
import { OrderPaymentHandler } from './application/events/OrderPaymentHandler';
import { OrderRejectHandler } from './application/events/OrderRejectHandler';
import { OrderService } from './application/OrderService';
import { TableService } from './application/TableService';
import { CategoryController } from './infraestructure/controllers/Category.controller';
import { OrderController } from './infraestructure/controllers/Order.controller';
import { ProductController } from './infraestructure/controllers/Product.controller';
import { TableOrderController } from './infraestructure/controllers/TableOrder.controller';
import { TypeOrderController } from './infraestructure/controllers/typeOrder.controller';
import { CategoryRepository } from './infraestructure/repository/CategoryRepository';
import { OrderRepository } from './infraestructure/repository/OrderRepository';
import { ProductRepository } from './infraestructure/repository/ProductRepository';
import { StatusRepository } from './infraestructure/repository/StatusRepository';
import { TableRepository } from './infraestructure/repository/TableRepository';
import { TypeOrderRepository } from './infraestructure/repository/TypeOrderRepository';
import { WsInit } from './infraestructure/ws/ws.init';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CategoryRepository,
      OrderRepository,
      TableRepository,
      ProductRepository,
      TypeOrderRepository,
      StatusRepository,
    ]),
    CqrsModule,
  ],
  controllers: [
    CategoryController,
    OrderController,
    ProductController,
    TableOrderController,
    TypeOrderController,
  ],
  providers: [
    { provide: 'GenerateCodeI', useClass: GenerateUuidShortUuid },
    TableService,
    OrderService,
    OrderAttendedHandler,
    OrderCreatedHandler,
    OrderPaymentHandler,
    OrderRejectHandler,
    WsInit,
  ],
  exports: [TypeOrmModule],
})
export class OrderHandlingModule {}

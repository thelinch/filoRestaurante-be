import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderAttendedHandler } from './application/events/OrderAttendedHandler';
import { OrderCreatedHandler } from './application/events/OrderCreatedHandler';
import { OrderPaymentHandler } from './application/events/OrderPaymentHandler';
import { OrderService } from './application/OrderService';
import { TableService } from './application/TableService';
import { CategoryController } from './infraestructure/controllers/Category.controller';
import { OrderController } from './infraestructure/controllers/Order.controller';
import { ProductController } from './infraestructure/controllers/Product.controller';
import { TableOrderController } from './infraestructure/controllers/TableOrder.controller';
import { CategoryEntity } from './infraestructure/entity/CategoryEntity';
import { OrderDetailEntity } from './infraestructure/entity/OrderDetailEntity';
import { OrderEntity } from './infraestructure/entity/OrderEntity';
import { ProductEntity } from './infraestructure/entity/ProductEntity';
import { TableEntity } from './infraestructure/entity/TableEntity';
import { CategoryRepository } from './infraestructure/repository/CategoryRepository';
import { OrderRepository } from './infraestructure/repository/OrderRepository';
import { ProductRepository } from './infraestructure/repository/ProductRepository';
import { TableRepository } from './infraestructure/repository/TableRepository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CategoryRepository,
      OrderRepository,
      TableRepository,
      ProductRepository,
    ]),
    CqrsModule,
  ],
  controllers: [
    CategoryController,
    OrderController,
    ProductController,
    TableOrderController,
  ],
  providers: [
    TableService,
    OrderService,
    OrderAttendedHandler,
    OrderCreatedHandler,
    OrderPaymentHandler,
  ],
  exports: [TypeOrmModule],
})
export class OrderHandlingModule {}

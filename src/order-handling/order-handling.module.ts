import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderAttendedHandler } from './application/events/OrderAttendedHandler';
import { OrderCreatedHandler } from './application/events/OrderCreatedHandler';
import { OrderService } from './application/OrderService';
import { TableService } from './application/TableService';
import { CategoryController } from './infraestructure/controllers/Category.controller';
import { OrderController } from './infraestructure/controllers/Order.controller';
import { CategoryEntity } from './infraestructure/entity/CategoryEntity';
import { OrderDetailEntity } from './infraestructure/entity/OrderDetailEntity';
import { OrderEntity } from './infraestructure/entity/OrderEntity';
import { ProductEntity } from './infraestructure/entity/ProductEntity';
import { TableEntity } from './infraestructure/entity/TableEntity';
import { CategoryRepository } from './infraestructure/repository/CategoryRepository';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryRepository]), CqrsModule],
  controllers: [CategoryController,OrderController],
  providers: [TableService, OrderService, OrderAttendedHandler,OrderCreatedHandler],
  exports: [TypeOrmModule],
})
export class OrderHandlingModule {}

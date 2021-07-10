import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderHandlingModule } from './order-handling/order-handling.module';
import { ManagmentUserModule } from './managment-user/managment-user.module';
import { CategoryEntity } from './order-handling/infraestructure/entity/CategoryEntity';
import { OrderDetailEntity } from './order-handling/infraestructure/entity/OrderDetailEntity';
import { OrderEntity } from './order-handling/infraestructure/entity/OrderEntity';
import { ProductEntity } from './order-handling/infraestructure/entity/ProductEntity';
import { TableEntity } from './order-handling/infraestructure/entity/TableEntity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'filo',
      synchronize: true,
      entities: [
        CategoryEntity,
        OrderDetailEntity,
        OrderEntity,
        ProductEntity,
        TableEntity,
      ],
    }),
    OrderHandlingModule,
    ManagmentUserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

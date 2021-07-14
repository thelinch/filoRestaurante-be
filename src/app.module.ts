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
import { UserEntity } from './managment-user/infraestructure/entity/UserEntity';
import { RoleEntity } from './managment-user/infraestructure/entity/RoleEntity';
import { ActionEntity } from './managment-user/infraestructure/entity/ActionEntity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'filo',
      synchronize: false,
      entities: [
        CategoryEntity,
        OrderDetailEntity,
        OrderEntity,
        ProductEntity,
        TableEntity,
        UserEntity,
        RoleEntity,
        ActionEntity,
      ],
    }),
    OrderHandlingModule,
    ManagmentUserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

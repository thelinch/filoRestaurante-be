import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderHandlingModule } from './order-handling/order-handling.module';
import { ManagmentUserModule } from './managment-user/managment-user.module';

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
    }),
    OrderHandlingModule,
    ManagmentUserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

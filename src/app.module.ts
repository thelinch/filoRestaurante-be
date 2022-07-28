import { Module } from '@nestjs/common';
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
import { TypeOrderEntity } from './order-handling/infraestructure/entity/TypeOrderEntity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../configuration';
import { StatusEntity } from './order-handling/infraestructure/entity/StatusEntity';

/* dotenv.config({ path: `${__dirname}.env.${process.env.NODE_ENV}` }); */

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        console.log(
          'usuario',
          configService.get<string>('bd.name'),
          'host',
          configService.get<string>('bd.host'),
        );
        return {
          type: 'mysql',
          host: configService.get<string>('bd.host'),
          port: configService.get<number>('bd.port'),
          username: configService.get<string>('bd.user'),
          password: configService.get<string>('bd.password') || '',
          database: configService.get<string>('bd.name'),
          synchronize: true,
          entities: [
            CategoryEntity,
            OrderDetailEntity,
            OrderEntity,
            ProductEntity,
            TableEntity,
            UserEntity,
            RoleEntity,
            ActionEntity,
            TypeOrderEntity,
            StatusEntity,
          ],
        };
      },
    }),

    OrderHandlingModule,
    ManagmentUserModule,
    AuthModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}

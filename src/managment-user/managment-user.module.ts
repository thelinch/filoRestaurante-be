import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './application/userService';
import { AuthController } from './infraestructure/controller/auth.controller';
import { ActionRepository } from './infraestructure/repository/ActionRepository';
import { RoleRepository } from './infraestructure/repository/RoleRepository';
import { UserRepository } from './infraestructure/repository/UserRepository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      RoleRepository,
      ActionRepository,
    ]),
  ],
  controllers: [AuthController],
  providers: [UserService],
  exports: [UserService],
})
export class ManagmentUserModule {}

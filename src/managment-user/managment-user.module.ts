import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './application/userService';
import { ActionController } from './infraestructure/controller/action.controller';
import { RoleController } from './infraestructure/controller/role.controller';
import { UserController } from './infraestructure/controller/user.controller';
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
  controllers: [UserController,ActionController,RoleController],
  providers: [UserService],
  exports: [UserService],
})
export class ManagmentUserModule {}

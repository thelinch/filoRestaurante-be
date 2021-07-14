import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/managment-user/application/userService';
import { User } from 'src/managment-user/domain/User';
import { JwtService } from '@nestjs/jwt';
const bcrypt = require('bcrypt');
const saltRounds = 10;

@Injectable()
export class authService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userName: string, password: string): Promise<User> {
    return await this.userService.authentication({ userName, password });
  }
  async login(user: any) {
    const salt = bcrypt.genSaltSync(saltRounds);
    user.password = bcrypt.hashSync(user.password, salt);
    const userDomain: User = await this.userService.findByUserNameAndPassword({
      userName: user.userName,
      passwordHash: user.password,
    });
    if (!userDomain) {
      throw new UnauthorizedException();
    }
    return {
      ...userDomain,
      access_token: this.jwtService.sign(userDomain.properties()),
    };
  }
}

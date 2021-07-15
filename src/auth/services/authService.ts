import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/managment-user/application/userService';
import { User, UserProperties } from 'src/managment-user/domain/User';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

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
    type userPropertiesToJwt = Pick<UserProperties, 'id' | 'userName'>;
    const userDomain: User = await this.userService.findByUserNameAndPassword({
      userName: user.userName,
      passwordHash: user.password,
    });
    if (!userDomain) {
      throw new NotFoundException({
        message: 'usuario no encontrado',
        statusCode: 404,
      });
    }
    if (
      userDomain &&
      !(await bcrypt.compare(user.password, userDomain.password))
    ) {
      throw new NotFoundException({
        message: 'usuario no encontrado',
        statusCode: 404,
      });
    }
    console.log("user",userDomain)
    return {
      ...userDomain,
      access_token: this.jwtService.sign({
        sub: userDomain.id,
        name: userDomain.name
      }),
    };
  }
}

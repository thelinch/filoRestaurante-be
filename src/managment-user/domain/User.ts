import { UnauthorizedException } from '@nestjs/common';
import { Role } from './Role';
import * as bcrypt from 'bcrypt';
const saltRounds = 10;
export interface UserProperties {
  readonly id: string;
  readonly name: string;
  readonly userName: string;
  readonly password: string;
  readonly roles: Role[];
}

export class User {
  id: string;
  name: string;
  userName: string;
  password: string;
  state: string;
  roles: Role[];

  constructor(props: UserProperties) {
    Object.assign(this, props);
  }
  properties() {
    return {
      name: this.name,
      id: this.id,
      userName: this.userName,
      password: '',
      roles: this.roles?.map((r) => r.properties()),
    };
  }
  static async create(props: UserProperties): Promise<User> {
    const user = new User(props);
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    return user;
  }
  authenticate({ userName, password }) {
    if (userName !== this.userName || this.password !== password) {
      throw new UnauthorizedException();
    }
  }
}

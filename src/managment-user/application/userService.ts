import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../domain/User';
import { UserRepository } from '../infraestructure/repository/UserRepository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async authentication({ userName, password }): Promise<User> {
    const user = await this.userRepository.findbyUserAndPassword({
      userName,
      password,
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
  async created(user: any) {
    const userDo = new User({ ...user });
    const salt = await bcrypt.genSalt();
    userDo.password = await bcrypt.hash(user.password, salt);
    return await this.userRepository.created(userDo);
  }
  async list() {
    return await this.userRepository.list();
  }

  async update(user: any) {
    return await this.userRepository.save(user);
  }
  async findByUserNameAndPassword({ userName, passwordHash }): Promise<User> {
    return await this.userRepository.findbyUserAndPassword({
      userName,
      password: passwordHash,
    });
  }
}

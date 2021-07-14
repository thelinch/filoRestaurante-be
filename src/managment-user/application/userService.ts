import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../domain/User';
import { UserRepository } from '../infraestructure/repository/UserRepository';

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
  async findByUserNameAndPassword({ userName, passwordHash }): Promise<User> {
    return await this.userRepository.findbyUserAndPassword({
      userName,
      password: passwordHash,
    });
  }
}

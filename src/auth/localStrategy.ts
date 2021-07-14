import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { authService } from './services/authService';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: authService) {
    super();
  }
  async validate(userName: string, password: string) {
    return await this.authService.validateUser(userName, password);
  }
}

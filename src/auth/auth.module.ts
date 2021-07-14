import { Module } from '@nestjs/common';
import { ManagmentUserModule } from 'src/managment-user/managment-user.module';
import { LocalStrategy } from './localStrategy';
import { authService } from './services/authService';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwtStrategy';
import { JwtAuthGuard } from './jwt.authGuard';
import { AuthController } from './controller/authController';

@Module({
  controllers: [AuthController],
  providers: [authService, LocalStrategy, JwtStrategy, JwtAuthGuard],
  imports: [
    ManagmentUserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  exports: [authService, JwtModule],
})
export class AuthModule {}

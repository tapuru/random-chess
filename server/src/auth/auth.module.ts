import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { TokensService } from './tokens.service';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies';
import { CookieService } from './cookie.service';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    TokensService,
    CookieService,
  ],
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({})],
})
export class AuthModule {}

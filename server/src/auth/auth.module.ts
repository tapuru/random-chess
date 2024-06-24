import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { TokensService } from './tokens.service';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies';
import { CookieService } from './cookie.service';
import { GoogleStrategy } from './strategies/google-oauth.strategy';
import { ProfileModule } from 'src/profile/profile.module';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    GoogleStrategy,
    TokensService,
    CookieService,
  ],
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({}),
    ProfileModule,
  ],
})
export class AuthModule {}

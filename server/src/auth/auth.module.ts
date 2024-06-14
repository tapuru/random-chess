import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleStrategy } from './utils/google.strategy';
import { User } from './user.entity';
import { SessionSerializer } from './utils/serializer';

@Module({
  controllers: [AuthController],
  providers: [
    GoogleStrategy,
    { provide: 'AUTH_SERVICE', useClass: AuthService },
    SessionSerializer,
  ],
  imports: [TypeOrmModule.forFeature([User])],
})
export class AuthModule {}

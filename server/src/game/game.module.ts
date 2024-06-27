import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game, GameResult, GameSettings } from './enitites';
import { ProfileModule } from 'src/profile/profile.module';
import { MoveEntity } from './enitites/move.entity';
import { GameGateway, GameService } from './providers';

@Module({
  providers: [GameGateway, GameService],
  imports: [
    TypeOrmModule.forFeature([Game, GameSettings, GameResult, MoveEntity]),
    ProfileModule,
  ],
})
export class GameModule {}

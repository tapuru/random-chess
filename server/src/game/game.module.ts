import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game, GameResult, GameSettings } from './enitites';
import { ProfileModule } from 'src/profile/profile.module';
import { MoveEntity } from './enitites/move.entity';
import { BoardService, GameGateway, GameService } from './providers';

@Module({
  providers: [GameGateway, GameService, BoardService],
  imports: [
    TypeOrmModule.forFeature([Game, GameSettings, GameResult, MoveEntity]),
    ProfileModule,
  ],
})
export class GameModule {}

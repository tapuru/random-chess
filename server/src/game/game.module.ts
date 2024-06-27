import { Module } from '@nestjs/common';
import { GameGateway } from './game-gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game, GameResult, GameSettings } from './enitites';
import { GameService } from './game.service';
import { ProfileModule } from 'src/profile/profile.module';

@Module({
  providers: [GameGateway, GameService],
  imports: [
    TypeOrmModule.forFeature([Game, GameSettings, GameResult]),
    ProfileModule,
  ],
})
export class GameModule {}

import { Module } from '@nestjs/common';
import { GameGateway } from './game-gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game, GameResult, GameSettings } from './enitites';

@Module({
  providers: [GameGateway],
  imports: [TypeOrmModule.forFeature([Game, GameSettings, GameResult])],
})
export class GameModule {}

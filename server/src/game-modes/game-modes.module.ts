import { Module } from '@nestjs/common';
import { GameModesService } from './game-modes.service';

@Module({
  providers: [GameModesService],
  exports: [GameModesService],
})
export class GameModesModule {}

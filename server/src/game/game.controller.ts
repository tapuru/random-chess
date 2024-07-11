import { Controller, Get, Param } from '@nestjs/common';
import { GameService } from './providers';

@Controller()
export class GameController {
  constructor(private gameService: GameService) {}

  @Get('game/:id')
  getGame(@Param('id') id: string) {
    return this.gameService.getGameById(id);
  }
}

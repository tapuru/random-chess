import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { GameService } from './providers';
import { AcessTokenGuard } from 'src/common/guards';
import { CreateGameDto } from './dto';

@Controller('/game')
export class GameController {
  constructor(private gameService: GameService) {}

  @UseGuards(AcessTokenGuard)
  @Get('/:id')
  getGame(@Param('id') id: string) {
    return this.gameService.getGameById(id);
  }

  @UseGuards(AcessTokenGuard)
  @Post('/create')
  createGame(@Body() dto: CreateGameDto) {
    return this.gameService.createGame(dto);
  }
}

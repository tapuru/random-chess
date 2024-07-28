import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GameService } from './providers';
import { AcessTokenGuard } from 'src/common/guards';
import { CreateGameDto } from './dto';
import { GetCurrentUser } from 'src/common/decorators';
import { GetGamesDto } from './dto/get-games.dto';

@Controller()
export class GameController {
  constructor(private gameService: GameService) {}

  @UseGuards(AcessTokenGuard)
  @Get('game/:id')
  getGame(@Param('id') id: string, @GetCurrentUser('sub') userId: string) {
    return this.gameService.getGame(id, userId);
  }

  @UseGuards(AcessTokenGuard)
  @Post('game/create')
  createGame(@Body() dto: CreateGameDto) {
    return this.gameService.createGame(dto);
  }

  @Get('/game')
  getGames(@Query() query: GetGamesDto) {
    return this.gameService.getPendingGames(query);
  }
}

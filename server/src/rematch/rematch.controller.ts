import { Controller, Get, Param } from '@nestjs/common';
import { RematchService } from './rematch.service';

@Controller('rematch')
export class RematchController {
  constructor(private rematchService: RematchService) {}

  @Get('/:gameId')
  getRematchData(@Param('gameId') gameId: string) {
    return this.rematchService.getRematchDataByGameId(gameId);
  }
}

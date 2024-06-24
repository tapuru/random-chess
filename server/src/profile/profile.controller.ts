import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetCurrentUser } from 'src/common/decorators';
import { AcessTokenGuard } from 'src/common/guards';

@Controller('profile')
export class ProfileController {
  @Get('/me')
  @UseGuards(AcessTokenGuard)
  getMe(@GetCurrentUser('sub') userId: string) {
    return 'Hello World!';
  }
}

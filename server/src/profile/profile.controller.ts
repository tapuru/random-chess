import { Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { GetCurrentUser } from 'src/common/decorators';
import { AcessTokenGuard } from 'src/common/guards';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('/me')
  @UseGuards(AcessTokenGuard)
  getMe(@GetCurrentUser('sub') userId: string) {
    return this.profileService.getProfileByUserId(userId);
  }

  @Get('/:id')
  getProfile(@Param('id') id: string) {
    return this.profileService.getProfileById(id);
  }

  @Put('/add-photo')
  @UseGuards(AcessTokenGuard)
  addPhoto(@GetCurrentUser('sub') userId: string, @Param() photo: string) {
    return 'Hello World!';
  }
}

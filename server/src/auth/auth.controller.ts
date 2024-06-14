import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './utils/guards';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  googleLogin() {
    return { message: 'google auth' };
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  googleRedirect() {
    return { message: 'google redirect' };
  }

  @Get('status')
  status(@Req() req: Request) {
    console.log(req.user);
    if (req.user) {
      return { message: 'Authenticated' };
    } else {
      return { message: 'Not Authenticated' };
    }
  }
}

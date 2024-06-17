import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { LoginDto, RegisterDto } from './dto';
import { Tokens } from './types';
import { AcessTokenGuard, RefreshTokenGuard } from 'src/common/guards';
import { GetCurrentUser } from 'src/common/decorators';
import { CookieService } from './cookie.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Res() res: Response, @Body() dto: RegisterDto) {
    const { refreshToken, accessToken } = await this.authService.register(dto);
    this.cookieService.setRefreshToken(res, refreshToken);
    res.json({ accessToken });
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto, @Res() res: Response) {
    const { refreshToken, accessToken } = await this.authService.login(dto);
    this.cookieService.setRefreshToken(res, refreshToken);
    res.json({ accessToken });
  }

  @Post('logout')
  @UseGuards(AcessTokenGuard)
  @HttpCode(HttpStatus.OK)
  async logout(
    @GetCurrentUser('sub') userId: string,
    @Res() res: Response,
    @GetCurrentUser() user: any,
  ) {
    console.log(user);
    const response = await this.authService.logout(userId);
    this.cookieService.removeRefreshToken(res);
    res.json(response);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RefreshTokenGuard)
  async refresh(
    @Res() res: Response,
    @GetCurrentUser('sub') userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    const { accessToken, refreshToken: newRefreshToken } =
      await this.authService.refresh(userId, refreshToken);
    // this.cookieService.setRefreshToken(res, newRefreshToken);
    res.json({ accessToken });
  }
}

import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { LoginDto, RegisterDto } from './dto';
import { GetCurrentUser } from 'src/common/decorators';
import { CookieService } from './cookie.service';
import {
  AcessTokenGuard,
  GoogleOauthGuard,
  RefreshTokenGuard,
} from 'src/common/guards';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Res() res: Response, @Body() dto: RegisterDto) {
    const { tokens, user } = await this.authService.register(dto);
    this.cookieService.setRefreshToken(res, tokens.refreshToken);
    res.json({ accessToken: tokens.accessToken, user });
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto, @Res() res: Response) {
    const { tokens, user } = await this.authService.login(dto);
    this.cookieService.setRefreshToken(res, tokens.refreshToken);
    res.json({ accessToken: tokens.accessToken, user });
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
    @GetCurrentUser() userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    console.log(userId);
    const { tokens, user } = await this.authService.refresh(
      userId,
      refreshToken,
    );
    this.cookieService.setRefreshToken(res, tokens.refreshToken);
    res.json({ accessToken: tokens.accessToken, user });
  }

  @Get('/google/redirect')
  @UseGuards(GoogleOauthGuard)
  async googleLogin(@Res() res: Response, @GetCurrentUser() user: any) {
    try {
      const { refreshToken, accessToken } =
        await this.authService.googleLogin(user);
      this.cookieService.setRefreshToken(res, refreshToken);
      res.redirect(`http://localhost:3000/login?token=${accessToken}`);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  @Get('testPrivateRoute')
  @UseGuards(AcessTokenGuard)
  @HttpCode(HttpStatus.OK)
  testPrivateRoute() {
    return { message: 'testPrivateRoute' };
  }
}

import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class CookieService {
  static acessTokenCookieName = 'access-token';
  static refreshTokenCookieName = 'refresh-token';

  setAcessToken(res: Response, token: string) {
    res.cookie(CookieService.acessTokenCookieName, token, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 1000 * 60 * 15,
    });
  }

  setRefreshToken(res: Response, token: string) {
    res.cookie(CookieService.refreshTokenCookieName, token, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
  }

  removeRefreshToken(res: Response) {
    res.clearCookie(CookieService.refreshTokenCookieName);
  }

  removeAcessToken(res: Response) {
    res.clearCookie(CookieService.acessTokenCookieName);
  }
}

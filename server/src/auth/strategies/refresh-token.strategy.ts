import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { CookieService } from '../cookie.service';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        RefreshTokenStrategy.extractJWT,
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_REFRESH_SECRET,
      passReqToCallback: true,
    });
  }

  private static extractJWT(req: Request): string | null {
    if (
      req.cookies &&
      CookieService.refreshTokenCookieName in req.cookies &&
      req.cookies[CookieService.refreshTokenCookieName].length > 0
    ) {
      return req.cookies[CookieService.refreshTokenCookieName];
    }
    return null;
  }

  async validate(req: Request, payload: any) {
    return {
      ...payload,
      refreshToken: req.cookies[CookieService.refreshTokenCookieName],
    };
  }
}

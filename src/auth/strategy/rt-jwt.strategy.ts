import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import 'dotenv/config';

@Injectable()
export class JwtRtStrategy extends PassportStrategy(Strategy, 'rt-jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.RT_JWT_SECRET as string,
    });
  }

  async validate(payload) {
    return payload;
  }
}

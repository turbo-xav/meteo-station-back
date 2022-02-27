import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifyCallback } from 'passport-jwt';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  /**
   * Logger
   */
   private readonly logger = new Logger(JwtStrategy.name);
  /**
   * Init JWT Passprot stratégy with secret key and bearer header
   * @param configService : Instance of config service to get JWT infos (sercet, ...)
   */

  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET_KEY'),
    });
  }

  /**
   * Check validity of JWT
   *
   * @param payload payload
   * @param done VerifyCallback
   */

  async validate(payload: any, done: VerifyCallback) {
    try {
      this.logger.log(payload, 'Jwt strategy payload');
      done(null, payload);
    } catch (err) {
      throw new UnauthorizedException('unauthorized', err.message);
    }
  }
}

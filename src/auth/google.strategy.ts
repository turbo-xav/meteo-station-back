import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable, Logger } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { AuthService, UserInfos } from './auth.service';
import { Meteo_User } from 'src/models/user.entity';
import { Role } from './role.enum';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  /**
   * Logger
   */
  private readonly logger = new Logger(GoogleStrategy.name);

  /**
   * Init Google Strategy with ClientId, ClientSecret, CallbackUrl, scope, ...
   * @param configService ConfigService to get ClientId, ClientSecret, CallbackUrl, scope
   */

  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_SECRET'),
      callbackURL: configService.get<string>('GOOGLE_CALLBACk_URL'),
      scope: ['email', 'profile'],
    });
  }

  /**
   * Validate JWT and make payload calles after Google call with code
   * ?code=....
   *
   * @param accessToken
   * @param refreshToken
   * @param profile
   * @param done
   */

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    // Infos from Google Access Token
    const { name, emails, photos } = profile;
    const user: UserInfos = {
      email: emails[0].value,
      firstname: name.givenName,
      lastname: name.familyName,
      picture: photos[0].value,
      role: Role.USER,
      accessToken,
      refreshToken,
    };

    // Try to get infos from user into BDD
    /*const userBdd: Meteo_User = await this.authService.userInfosFromBdd(user);
    user.role = Role.USER;
    if (userBdd !== undefined) {
      user.role = userBdd.role as Role;
    }*/

    //
    const payload = {
      ...user,
      token: jwt.sign(user, process.env.JWT_SECRET_KEY, { expiresIn: 3600 }),
    };

    this.logger.log(payload, 'Google strategy Payload');

    done(null, payload);
  }
}

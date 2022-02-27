import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

export interface UserInfos {
  email: string;
  firstname: string;
  lastname: string;
  picture: string;
  accessToken: string;
  refreshToken: string;
}

export interface GoogleInfos {
  message: string;
  user: UserInfos;
}

@Injectable()
export class AuthService {
  /**
   * Logger
   */
  private readonly logger = new Logger(AuthService.name);

  /**
   *
   * @param configService  ConfigService
   */

  constructor(private readonly configService: ConfigService) {}

  /**
   *
   * @param token Verify token vilidity & return decoded token
   * @returns
   */

  verifyToken(token: string): unknown {
    return jwt.verify(token, this.configService.get<string>('JWT_SECRET_KEY'));
  }

  /**
   * Return user logged with google or UnauthorizedException Exception if no user
   * @param req HTTP request transporting user infos
   * @returns GoogleInfos
   */

  googleInfos(user?: UserInfos): GoogleInfos {
    if (!user) {
      throw new UnauthorizedException('unauthorized');
    }

    const infos: GoogleInfos = {
      message: 'User information from google',
      user: user as UserInfos,
    };
    this.logger.log(infos, 'Google infos calculated:');
    return infos;
  }
}

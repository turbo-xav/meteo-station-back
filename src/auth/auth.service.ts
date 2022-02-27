import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Meteo_Device } from 'src/models/device.entity';
import { Meteo_User } from 'src/models/user.entity';

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

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Meteo_User)
    private usersRepository: Repository<Meteo_User>,
    @InjectRepository(Meteo_Device)
    private deviceRepository: Repository<Meteo_Device>,
  ) {}

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

  /**
   * Register user infos into DataBase with refeshed datas
   */

  async register(user: UserInfos): Promise<void> {
    const userLogged: Meteo_User = await this.usersRepository.findOne({
      email: user.email,
    });
    userLogged.firstname = user.firstname;
    userLogged.lastname = user.lastname;
    userLogged.picture = user.picture;
    userLogged.email = user.email;
    await this.usersRepository.save(userLogged);
  }
}

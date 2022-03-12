import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Meteo_Device } from 'src/models/device.entity';
import { Meteo_User } from 'src/models/user.entity';
import { Role } from './role.enum';

export interface UserInfos {
  email: string;
  firstname: string;
  lastname: string;
  picture: string;
  role: Role;
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
    private connection: Connection,
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

  googleInfosAndRegister(user?: UserInfos): GoogleInfos {
    if (!user) {
      throw new UnauthorizedException('unauthorized');
    }

    const infos: GoogleInfos = {
      message: 'User information from google',
      user: user as UserInfos,
    };
    this.logger.log(infos, 'Google infos calculated:');
    this.register(infos.user);
    return infos;
  }

  public async userInfosFromBdd(user: UserInfos): Promise<Meteo_User> {
    return await this.usersRepository.findOne({
      email: user.email,
    });
  }

  /**
   * Register user infos into DataBase with refeshed datas
   */

  private async register(user: UserInfos): Promise<void> {
    let userBddLogged: Meteo_User = await this.userInfosFromBdd(user);
    //console.log(user, userBddLogged);
    if (userBddLogged === undefined) {
      userBddLogged = new Meteo_User();
      userBddLogged.role = Role.USER;
    }

    userBddLogged.firstname = user.firstname;
    userBddLogged.lastname = user.lastname;
    userBddLogged.picture = user.picture;
    userBddLogged.email = user.email;
    user.role = userBddLogged.role as Role;
    await this.usersRepository.save(userBddLogged);
  }

  /**
   * Fill DataBase when necassary
   */

  public async fillDataBase(): Promise<void> {
    const users: Meteo_User[] = [
      {
        id: 1,
        email: 'xavier.tagliarino@gmail.com',
        role: Role.ADMIN,
        firstname: 'unkown before connecion',
        lastname: 'he is ADMIN by default',
        picture: 'where is my picture',
      } as Meteo_User,
      {
        id: 2,
        email: 'tagliarino.xavier@gmail.com',
        role: Role.USER,
        firstname: 'unkown before connecion',
        lastname: 'he is USER by default',
        picture: 'i lost my picture',
      } as Meteo_User,
    ];

    const devices: Meteo_Device[] = [
      {
        id: 1,
        thingerio_login: 'homemeteostation',
        thingerio_bearer:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJ0dXJib3hhdiIsInVzciI6InR1cmJveGF2In0.k3mlSxsUlTVu6fBm5bIriFQr8CSA6pdTUDoV9s4dHb4',
        user: users[0],
      } as Meteo_Device,
    ];
    await this.connection.dropDatabase();
    await this.connection.synchronize();
    await this.deviceRepository.delete({});
    await this.usersRepository.delete({});
    for (const user of users) {
      this.logger.log(user, 'User created');
      await this.usersRepository.save(user);
    }
    for (const device of devices) {
      this.logger.log(device, 'Device created');
      await this.deviceRepository.save(device);
    }
  }
}

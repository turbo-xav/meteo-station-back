/**
 * This is the Authentication controller
 * It inits Google authentication & return user infos when user is authenticated
 */

import {
  Controller,
  Get,
  Logger,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { AuthService, GoogleInfos, UserInfos } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { User } from 'src/decorator/user.decorator';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  /**
   * A logger for this contoller
   */

  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Try to connect
   * If no code redirect to google authentication server
   */

  @UseGuards(AuthGuard('google'))
  @Get('')
  log(): any {
    this.logger.log(`try to get infos`);
  }

  /**
   * Transport authentication code into URL & redirect to front URL with this code into URL
   * Ex: back-url/auth/code?code=xxx... => front-url-redir?code=xxx...
   *
   * @param code Google authentication code
   * @param res HTTP Response
   */

  @Get('code')
  connect(@Query('code') code, @Res() response): any {
    this.logger.log(`redirect to front & get acess token from code : ${code}`);
    const frontUrlRoot = this.configService.get<string>('FRONT_URL');
    this.logger.log(`FRONT_URL : ${frontUrlRoot}`);
    const urlForCode = this.configService.get<string>('FRONT_URL_REDIR');
    this.logger.log(`FRONT_URL_REDIR : ${urlForCode}`);
    const encodedCode = encodeURIComponent(code);
    const frontUrlWithCode = `${frontUrlRoot}${urlForCode}${encodedCode}`;
    this.logger.log(`redirect to : ${frontUrlWithCode}`);
    response.redirect(301, frontUrlWithCode);
  }

  /**
   * Authenticate to google server and return google infos
   * @param req
   * @returns infos
   */

  @UseGuards(AuthGuard('google'))
  @Get('token')
  token(@User() user: UserInfos, @Query() query: Record<string, unknown>): any {
    this.logger.log(
      query?.code as string,
      'try to get infos & token from authentication code : ',
    );
    const infos: GoogleInfos = this.authService.googleInfosAndRegister(user);
    this.logger.log(infos, 'Google Infos returned to front');
    return infos;
  }
}

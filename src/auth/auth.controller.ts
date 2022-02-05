/**
 * This is the root controller
 * He hardly does anything but say hello
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
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
//import { config } from 'dotenv';
//config();
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
   */

  @UseGuards(AuthGuard('google'))
  @Get('')
  log(@Req() req): any {
    this.logger.log(`try to get infos`);
  }

  @Get('code')
  connect(@Query('code') code, @Res() res): any {
    this.logger.log(`try to get code:${code}`);    
    const url = `${this.configService.get('FRONT_URL_REDIR')}${encodeURIComponent(code)}`;
    this.logger.log(`redirect to : ${url}`);
    res.redirect(301, url);
  }

  @UseGuards(AuthGuard('google'))
  @Get('token')
  token(@Req() req): any {
    this.logger.log(`try to get infos & token`, req);
    return this.authService.googleInfos(req);
  }
}

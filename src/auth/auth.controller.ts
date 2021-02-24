/**
 * This is the root controller 
 * He hardly does anything but say hello
 */

import { Controller, Get, Logger, Query, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags } from "@nestjs/swagger";
import { urlencoded } from "express";
import { AuthService } from "./auth.service";

@ApiTags('Auth')
@Controller("auth")
export class AuthController {
    
    /**
   * A logger for this contoller
   */

  private readonly logger = new Logger(AuthController.name);

    constructor(    
        private readonly authService: AuthService) {     
    }

  /**
    * Try to connect
    */

  @UseGuards(AuthGuard('google'))   
  @Get('')
  log(@Req() req): any {
    this.logger.log(`try to get infos`);     
  }
   
  @Get('code')
  connect( @Query('code') code, @Res() res): any {    
    this.logger.log(`try to get code:${code}`);
    const url = `http://localhost:8080/#/auth/code/${encodeURIComponent(code)}`;
    this.logger.log(`redirect to : ${url}`)    
    res.redirect(301, url);        
  }

  @UseGuards(AuthGuard('google'))   
  @Get('token')
  token( @Req() req): any {
    this.logger.log(`try to get infos & token`);
    return this.authService.googleInfos(req);    
  }



}
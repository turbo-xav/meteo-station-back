import { Controller, Get, Logger, Param, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Hello } from './models/hello.entity';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
/**
 * This is the root controller 
 * He hardly does anything but say hello
 */

@ApiTags('Hello')
@Controller("/")
export class AppController {
  
  /**
   * A logger for this contoller
   */

  private readonly logger = new Logger(AppController.name);

  /**
   * We just inject AppService
   * 
   * @param appService 
   */
  
  
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService) { 

    }
  
  /**
    * Try to return a Hello message
    */

  @ApiResponse({
    status: 200,
    type: Hello,
    description: 'Hello message to welcome to Meteo API'
  })
  @Get()  
  getHello(): Hello {
    this.logger.log('Try to say hello message');
    const helloMessage = this.appService.getHello();
    this.logger.log(`Hello message is : ${helloMessage.message}`);    
    return helloMessage;
  }

    
  //@UseGuards(AuthGuard('google'))   
  @Get('connect')
  connect( @Query('code') code, @Res() res): any {
    this.logger.log(`try to get code:${code}`);
    res.redirect(`/log?code=${code}`,301);
    return code;    
  }

  /**
    * Try to connect
    */

  @UseGuards(AuthGuard('google'))   
  @Get('log')
  log(@Req() req): any {
    this.logger.log(`try to get infos`);
    return this.authService.googleInfos(req);
  }
  
  /**
    * Try to auth
    */

  @UseGuards(AuthGuard('jwt'))  
  @Get('auth')
  checkJwtAuth(): void {
    this.logger.log(`JWT Auth is OK if you can see it. Pennywise is here ! they float all here ^^`);
  }

  /**
    * Try to auth
    */

   @UseGuards(AuthGuard('google'))  
   @Get('google')
   checkAuth(@Res() res): void {
    this.logger.log(`Try google auth`);
   }
}

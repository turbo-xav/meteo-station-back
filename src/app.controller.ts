import { Controller, Get, Logger, OnModuleInit } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Hello } from './models/hello.entity';
import { AuthService } from './auth/auth.service';

/**
 * This is the root controller
 * He hardly does anything but say hello
 */

@ApiTags('Hello')
@Controller('')
export class AppController implements OnModuleInit  {
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
    private authService: AuthService,
  ) {}

  /** */

  async onModuleInit() {
    this.logger.log(`Fill data base`);
    await this.authService.fillDataBase();
  }

  /**
   * Try to return a Hello message
   */

  @ApiResponse({
    status: 200,
    type: Hello,
    description: 'Hello message to welcome to Meteo API',
  })
  @Get()
  async getHello(): Promise<Hello> {
    this.logger.log('Try to say hello message');
    const helloMessage = this.appService.getHello();
    this.logger.log(`Hello message is : ${helloMessage.message}`);    
    return helloMessage;
  }
}

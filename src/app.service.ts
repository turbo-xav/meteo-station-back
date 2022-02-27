import { Injectable, Logger } from '@nestjs/common';
import { Hello } from './models/hello.entity';

/**
 * This a simple service to say Hello
 */

@Injectable()
export class AppService {
  /**
   * Default logger
   *
   */

  private readonly logger = new Logger(AppService.name);

  /**
   * A method to say Hello
   */

  getHello(): Hello {
    this.logger.log('Try to return "Hello" message');
    return { message: 'Hello World! This my connected meteo station' };
  }
}

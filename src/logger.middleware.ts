import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

/**
 * A simple Middle Ware for logging
 */

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  /**
   * Middle can log request, response
   * next is the "next" Middleware to call when this one is ended
   * 
   * @param req 
   * @param res 
   * @param next 
   */

  use(req: Request, res: Response, next: NextFunction) {
    //console.log(req.method, ' - ', req.url, ' headers: ', JSON.stringify(req.headers),'status : ', res.statusCode);
    next();
  }
}

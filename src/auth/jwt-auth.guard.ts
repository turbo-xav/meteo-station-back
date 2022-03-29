import {
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

/**
 * JWT Auth guard to check JWT authentication
 */

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  /**
   * Logger
   */

  private readonly logger = new Logger(JwtAuthGuard.name);

  constructor(private readonly reflector: Reflector) {
    super();
  }

  /**
   * Personalised canActivate method
   *
   * @param context
   * @returns
   */

  canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    return super.canActivate(context);
  }

  /**
   * Personnalised HandleRequest method return User if ok or UnauthorizedException if no user or error
   *
   * @param err
   * @param user
   * @param info
   * @returns
   */

  handleRequest(err: any, user: any, info: any) {
    this.logger.log(user, 'user info from JWT');
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}

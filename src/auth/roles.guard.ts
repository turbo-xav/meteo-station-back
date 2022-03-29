import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/decorator/roles.decorator';
import { Role } from './role.enum';
import { Request } from 'express';
import { UserInfos } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const requestUser: UserInfos = (ctx.switchToHttp().getRequest() as Request)
      ?.user as UserInfos;
    console.log(requestUser);
    return (
      (requestUser !== undefined &&
        requiredRoles.some((role) => requestUser.role === role)) ||
      requestUser.role === 'ADMIN'
    );
  }
}

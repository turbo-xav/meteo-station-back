import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { UserInfos } from 'src/auth/auth.service';

/**
 * Just a decorator to get User from the in-flight `request` object
 */

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserInfos => {
    const request = ctx.switchToHttp().getRequest() as Request;
    return request?.user as UserInfos;
  },
);

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserJwtPayload } from '@api/auth/auth.service';
export const CurrentUser = createParamDecorator(
  (data, ctx: ExecutionContext): UserJwtPayload => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);

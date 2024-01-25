import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserJwtPayload } from '@api/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
export const CurrentUser = createParamDecorator(
  // how to use private readonly jwtService: JwtService

  (data, ctx: ExecutionContext): UserJwtPayload => {
    const req = ctx.switchToHttp().getRequest();
    const jwtService = new JwtService({
      secret: process.env.JWT_SECRET,
    });

    if (req.user) {
      return req.user;
    }
    if (req.cookies['USER_COOKIE']) {
      const jwt = req.cookies['USER_COOKIE'];
      const payload = jwtService.verify(jwt);
      return {
        id: payload.id,
        userName: payload.userName,
      };
    }

    return null;
  },
);

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

export interface UserJwtPayload {
  id: number;
  userName: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  signJWT(payload: UserJwtPayload): string {
    const token = this.jwtService.sign(
      {
        id: payload.id,
        userName: payload.userName,
      },
      {
        secret: process.env.JWT_SECRET,
      },
    );
    return token;
  }

  // NOTE: 암호와 관련된 권한은 Auth 모듈에 있어야 한다.
  async hashPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);

    return isPasswordValid;
  }
}

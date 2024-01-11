import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtGuard } from '@api/auth/jwt.guard';
import { LoginDto } from '@api/user/dto/login.dto';
import { UserJwtPayload } from '@api/auth/auth.service';
import { CurrentUser } from '@api/library/decorator/current-user';

@Controller('user')
export class UserController {
  private readonly cookieName: string;
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    this.cookieName = this.configService.get('COOKIE_SECRET');
  }

  @Post('sign-up')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Post('sign-in')
  async findOne(
    @Body() LoginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const token = await this.userService.loginUser(LoginDto);

    // NOTE: CLIENT에게 쿠키를 생성하는 권한은 Controller에 있어야 한다.
    response.cookie(this.cookieName, token, {
      httpOnly: true,
      domain: this.configService.get<string>('COOKIE_DOMAIN'),
      maxAge: this.configService.get<number>('COOKIE_EXPIRES'),
    });

    return {
      result: true,
    };
  }

  @UseGuards(JwtGuard)
  @Get('')
  async findAll(@CurrentUser() user: UserJwtPayload) {
    //TODO: 필요 시 유저 정보를 반환.
    // 원래는 따로 Dto를 만들어서 받는게 좋음
    return await this.userService.findOneUser(user.userName);
  }
}

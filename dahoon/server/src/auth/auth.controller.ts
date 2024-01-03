import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() authcredentialDto: AuthCredentialDto) {
    return this.authService.signUp(authcredentialDto);
  }

  @Post('/signin')
  async signin(
    @Body() authcredentialDto: AuthCredentialDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authcredentialDto);
  }

  @Get('/validate')
  @UseGuards(AuthGuard())
  async validate(@Req() req: Request) {
    console.log(req);
  }
}

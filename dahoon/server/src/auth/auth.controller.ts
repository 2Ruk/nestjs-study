import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

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
  async validate(@GetUser() user: User) {
    console.log(user);
  }
}

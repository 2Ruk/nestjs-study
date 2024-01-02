import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() authcredentialDto: AuthCredentialDto) {
    return this.authService.signUp(authcredentialDto);
  }

  @Post('/signin')
  async signin(@Body() authcredentialDto: AuthCredentialDto): Promise<string> {
    return this.authService.signIn(authcredentialDto);
  }
}

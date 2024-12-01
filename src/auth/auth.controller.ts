import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn';
import { SignOutDto } from './dto/signOut';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('signout')
  signOut(@Body() signOutDto: SignOutDto) {
    return this.authService.signOut(signOutDto.token);
  }
}

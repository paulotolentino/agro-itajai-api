import { Controller, Post, Body, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Get('signout')
  async signOut(@Request() req) {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];
    return await this.authService.signOut(token);
  }
}

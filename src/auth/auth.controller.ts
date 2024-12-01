import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn';
import { SignOutDto } from './dto/signOut';
import { NotAuthorizedError } from 'src/CommonErrors';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() signInDto: SignInDto) {
    try {
      const response = await this.authService.signIn(signInDto);
      return response;
    } catch (error) {
      if (error instanceof NotAuthorizedError) {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('signout')
  async signOut(@Body() signOutDto: SignOutDto) {
    try {
      await this.authService.signOut(signOutDto.token);
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

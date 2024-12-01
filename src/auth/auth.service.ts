import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signIn';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { blacklistedTokens } from '../common/guards/auth.guard';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}
  async signIn(signInDto: SignInDto) {
    // TODO Log sign in attempt
    const user = await this.findByUsername(signInDto.username);
    if (!user || !(await bcrypt.compare(signInDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // TODO Log successful sign in

    try {
      const payload = { username: user.username, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  private async findByUsername(username: string) {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async signOut(token: string) {
    // Invalidate the token by adding it to the AuthGuard blacklist
    blacklistedTokens.add(token);

    // TODO Log signOut attempt

    // TODO Log successful sign out

    return 'signout success';
  }
}

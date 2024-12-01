import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signIn';
import { InternalServerError, NotAuthorizedError } from 'src/CommonErrors';

// Mocked users
const users = [
  {
    id: 1,
    password: 'FakeP4$$word',
    name: 'John Doe',
    username: 'johndoe',
  },
];

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  async signIn(signInDto: SignInDto) {
    // TODO Log signIn attempt
    try {
      const user = users.find(
        (user) =>
          user.username === signInDto.username &&
          user.password === signInDto.password,
      );
      if (!user) {
        throw new NotAuthorizedError();
      }
      const payload = { username: user.username, sub: user.id };

      // TODO Log successful sign in

      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      if (error instanceof NotAuthorizedError) {
        throw new NotAuthorizedError();
      }
      console.error(error);
      throw new InternalServerError();
    }
  }

  async signOut(token: string) {
    // TODO Implement signOut method
    // This method should invalidate the token and return a success message
    // The token is a JWT token that was previously generated by the signIn method

    // TODO Log signOut attempt

    // TODO Log successful sign out

    return 'signout success';
  }
}
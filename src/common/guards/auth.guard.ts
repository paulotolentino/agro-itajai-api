import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// Invalidate the token by adding it to a blacklist
export const blacklistedTokens = new Set<string>();

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header not found');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    // Check if the token is blacklisted
    if (blacklistedTokens.has(token)) {
      throw new UnauthorizedException('Token is invalidated');
    }

    try {
      const decoded = this.jwtService.verify(token);
      request.user = { ...decoded, id: decoded.sub };
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}

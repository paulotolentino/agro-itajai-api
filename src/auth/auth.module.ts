import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import secretsConfig from 'src/secretsConfig';

const jwtConfig = secretsConfig().jwt;
@Module({
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

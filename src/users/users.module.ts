import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';
import secretsConfig from 'src/secretsConfig';

const jwtConfig = secretsConfig().jwt;
@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}

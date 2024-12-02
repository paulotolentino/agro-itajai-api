import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { BrandsModule } from './brands/brands.module';
import secretsConfig from './secretsConfig';

const jwtConfig = secretsConfig().jwt;
@Module({
  imports: [
    AuthModule,
    UsersModule,
    JwtModule.register({
      secret: jwtConfig.secret,
      signOptions: { expiresIn: jwtConfig.expiresIn },
      global: true,
    }),
    BrandsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

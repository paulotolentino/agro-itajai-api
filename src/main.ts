import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import secretsConfig from './secretsConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(secretsConfig().port);
}
bootstrap();

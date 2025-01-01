import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import secretsConfig from './secretsConfig';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração básica do Swagger
  const config = new DocumentBuilder()
    .setTitle('Agro Itajaí API')
    .setDescription('Documentação da API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  app.enableCors({
    // Set env variable to allow only specific origins
    origin: 'http://localhost:3000',
    allowedHeaders:
      'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-unit-id',
  });
  await app.listen(secretsConfig().port);
}
bootstrap();

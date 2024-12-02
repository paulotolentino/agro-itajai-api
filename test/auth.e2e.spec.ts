import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../src/auth/auth.controller';
import { AuthService } from '../src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { faker } from '@faker-js/faker';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  const MOCKED_TOKEN = faker.string.uuid();
  let authService = {
    signIn: () => ({ access_token: MOCKED_TOKEN }),
    signOut: () => 'signout success',
  }; // Mock do AuthService

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, JwtService],
    })
      .overrideProvider(AuthService)
      .useValue(authService) // Usando o mock do AuthService
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/signin (POST) should return a JWT', () => {
    return request(app.getHttpServer())
      .post('/auth/signin')
      .send({ username: 'johndoe', password: 'password' })
      .expect(201)
      .expect({
        access_token: MOCKED_TOKEN,
      });
  });

  it('/auth/signout (POST) should return a success message', () => {
    return request(app.getHttpServer())
      .get('/auth/signout')
      .auth(MOCKED_TOKEN, { type: 'bearer' })
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});

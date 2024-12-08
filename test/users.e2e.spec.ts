import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { AuthGuard } from '../src/common/guards/auth.guard';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;
  let authToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(AuthGuard) // Mock do AuthGuard
      .useValue({
        canActivate: jest.fn(() => true), // Sempre permite o acesso
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    prismaService = app.get(PrismaService);

    // Limpar o banco de dados antes de cada teste
    await prismaService.user.deleteMany();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /users', () => {
    it('should create a new user', async () => {
      const createUserDto = {
        username: 'john_doe',
        password: '123456',
        name: 'John Doe',
      };

      const response = await request(app.getHttpServer())
        .post('/users')
        .set('Authorization', `Bearer ${authToken}`)
        .send(createUserDto)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toMatchObject({
        username: 'john_doe',
      });
    });
  });

  describe('GET /users', () => {
    it('should return an array of users', async () => {
      const response = await request(app.getHttpServer())
        .get('/users')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThanOrEqual(0);
      expect(response.body[0]).not.toHaveProperty('password'); // Verifica que a senha não está no retorno
    });
  });

  describe('GET /users/:id', () => {
    it('should return a specific user', async () => {
      const user = await prismaService.user.create({
        data: { username: 'jane_doe', name: 'Jane Doe', password: '654321' },
      });

      const response = await request(app.getHttpServer())
        .get(`/users/${user.id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toMatchObject({
        id: user.id,
        username: 'jane_doe',
      });
    });

    it('should return 404 if user not found', async () => {
      await request(app.getHttpServer())
        .get('/users/999')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);
    });
  });

  describe('PATCH /users/:id', () => {
    it('should update a user', async () => {
      const user = await prismaService.user.create({
        data: {
          username: 'john_smith',
          name: 'John Smith',
          password: '123456',
        },
      });

      const updateUserDto = {
        username: 'john_smith_updated',
      };

      const response = await request(app.getHttpServer())
        .patch(`/users/${user.id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateUserDto)
        .expect(200);

      expect(response.body).toMatchObject({
        id: user.id,
        username: 'john_smith_updated',
      });
    });
  });

  describe('DELETE /users/:id', () => {
    it('should delete a user', async () => {
      const user = await prismaService.user.create({
        data: { username: 'delete_me', name: 'Delete Me', password: '123456' },
      });

      await request(app.getHttpServer())
        .delete(`/users/${user.id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      const foundUser = await prismaService.user.findUnique({
        where: { id: user.id },
      });
      expect(foundUser).toBeNull();
    });
  });
});

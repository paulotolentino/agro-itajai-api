import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('PaymentTypeController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/payment-types (GET)', () => {
    return request(app.getHttpServer())
      .get('/payment-types')
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Array);
      });
  });

  it('/payment-types/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/payment-types/1')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('name');
      });
  });

  it('/payment-types (POST)', () => {
    return request(app.getHttpServer())
      .post('/payment-types')
      .send({ name: 'New Payment Type' })
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toEqual('New Payment Type');
      });
  });

  it('/payment-types/:id (PUT)', () => {
    return request(app.getHttpServer())
      .put('/payment-types/1')
      .send({ name: 'Updated Payment Type' })
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toEqual('Updated Payment Type');
      });
  });

  it('/payment-types/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/payment-types/1')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('deleted');
        expect(res.body.deleted).toBe(true);
      });
  });
});

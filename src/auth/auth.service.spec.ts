import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  const MOCKED_TOKEN = faker.string.uuid();

  beforeEach(async () => {
    const mockJwtService = {
      sign: jest.fn(() => ({ access_token: MOCKED_TOKEN })),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: JwtService, useValue: mockJwtService }, // Mock do JwtService
        { provide: AuthService, useValue: { signIn: jest.fn() } }, // Mock do AuthService
        { provide: PrismaService, useValue: {} }, // Mock do PrismaService
        { provide: JwtService, useValue: mockJwtService }, // Mock do JwtService
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(jwtService).toBeDefined();
  });
});

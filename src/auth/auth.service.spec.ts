import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  const MOCKED_TOKEN = faker.string.uuid();

  beforeEach(async () => {
    const mockJwtService = {
      sign: jest.fn(() => MOCKED_TOKEN),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
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

  it('should return a access token', async () => {
    const signInDto = {
      username: 'johndoe',
      password: 'FakeP4$$word',
    };
    const result = await service.signIn(signInDto);
    expect(result).toEqual({ access_token: MOCKED_TOKEN });
    expect(jwtService.sign).toHaveBeenCalled();
  });

  it('should return a Not Authorized error', async () => {
    await expect(
      service.signIn({
        username: 'johndoe',
        password: 'invalid-password',
      }),
    ).rejects.toThrow('Invalid credentials');
  });

  it('should log out a logged user', async () => {
    const token = faker.string.uuid();
    const result = await service.signOut(token);
    expect(result).toBe('signout success');
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: jest.Mocked<AuthService>;
  const MOCKED_TOKEN = faker.string.uuid();

  beforeEach(async () => {
    const mockAuthService = {
      signIn: jest.fn(), // Mock do método signIn
      signOut: jest.fn(), // Mock do método signOut
    } as Partial<jest.Mocked<AuthService>>;

    const mockJwtService = {
      sign: jest.fn(() => MOCKED_TOKEN),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService }, // Mock do AuthService
        { provide: JwtService, useValue: mockJwtService }, // Mock do JwtService
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get(AuthService) as jest.Mocked<AuthService>;
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
    expect(authService).toBeDefined();
  });

  it('should call signIn with correct values', async () => {
    const credentials = {
      username: 'johndoe',
      password: 'invalid-password',
    };
    await authController.signIn(credentials);

    expect(authService.signIn).toHaveBeenCalledWith(credentials);
  });

  it('should call signOut with correct values', async () => {
    const token = faker.string.uuid();
    authService.signOut.mockResolvedValue('signout success'); // Mock do retorno do método

    const result = await authController.signOut({ token });

    expect(result).toBe('signout success');
    expect(authService.signOut).toHaveBeenCalledWith(token);
  });
});

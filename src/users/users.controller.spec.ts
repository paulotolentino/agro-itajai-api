import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtModule } from '@nestjs/jwt';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUsersService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      imports: [JwtModule.register({})], // Import the module containing JwtService
      providers: [{ provide: UsersService, useValue: mockUsersService }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call UsersService.create with the correct values', async () => {
      const dto: CreateUserDto = {
        name: 'John Doe',
        username: 'johndoe',
        password: 'password123',
      };

      await controller.create(dto);

      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should call UsersService.findAll', async () => {
      await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call UsersService.findOne with the correct ID', async () => {
      await controller.findOne('1');

      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should call UsersService.update with the correct values', async () => {
      const dto: UpdateUserDto = {
        name: 'John Updated',
        username: 'johnupdated',
      };

      await controller.update('1', dto);

      expect(service.update).toHaveBeenCalledWith(1, dto);
    });
  });

  describe('remove', () => {
    it('should call UsersService.remove with the correct ID', async () => {
      await controller.remove('1');

      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});

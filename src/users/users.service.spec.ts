import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: jest.Mocked<PrismaService>;

  const mockPrismaService = {
    user: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prisma).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const dto = {
        username: 'johndoe',
        name: 'John Doe',
        email: 'john@example.com',
        password: '123456',
      };
      const expectedResult = { id: 1, ...dto };

      (prisma.user.create as jest.Mock).mockResolvedValue(expectedResult);

      const result = await service.create(dto);

      expect(prisma.user.create).toHaveBeenCalledWith({ data: dto });
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findAll', () => {
    it('should return all users without passwords', async () => {
      const users = [
        { id: 1, name: 'John', email: 'john@example.com', password: '123456' },
        { id: 2, name: 'Jane', email: 'jane@example.com', password: '654321' },
      ];
      const expectedUsers = users.map(({ password, ...user }) => user);

      (prisma.user.findMany as jest.Mock).mockResolvedValue(users);

      const result = await service.findAll();

      expect(prisma.user.findMany).toHaveBeenCalled();
      expect(result).toEqual(expectedUsers);
    });
  });

  describe('findOne', () => {
    it('should return a user without password', async () => {
      const user = {
        id: 1,
        name: 'John',
        email: 'john@example.com',
        password: '123456',
      };
      const expectedUser = { id: 1, name: 'John', email: 'john@example.com' };

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(user);

      const result = await service.findOne(1);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(expectedUser);
    });

    it('should return undefined if user not found', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await service.findOne(1);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toBeUndefined();
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateDto = {
        name: 'John Updated',
        email: 'john.updated@example.com',
      };
      const expectedUser = { id: 1, ...updateDto };

      (prisma.user.update as jest.Mock).mockResolvedValue(expectedUser);

      const result = await service.update(1, updateDto);

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateDto,
      });
      expect(result).toEqual(expectedUser);
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      const expectedUser = {
        id: 1,
        name: 'John',
        email: 'john@example.com',
        password: '123456',
      };

      (prisma.user.delete as jest.Mock).mockResolvedValue(expectedUser);

      const result = await service.remove(1);

      expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(expectedUser);
    });
  });
});

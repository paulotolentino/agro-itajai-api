import { Test, TestingModule } from '@nestjs/testing';
import { BrandsService } from './brands.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

describe('BrandsService', () => {
  let service: BrandsService;
  let prisma: jest.Mocked<PrismaService>;

  const mockPrismaService = {
    brand: {
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
        BrandsService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<BrandsService>(BrandsService);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a brand', async () => {
      const createBrandDto: CreateBrandDto = { name: 'Test Brand' };
      const createdBrand = {
        id: 1,
        name: 'Test Brand',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (prisma.brand.create as jest.Mock).mockResolvedValue(createdBrand);

      expect(await service.create(createBrandDto)).toEqual(createdBrand);
    });
  });

  describe('findAll', () => {
    it('should return an array of brands', async () => {
      const brands = [
        {
          id: 1,
          name: 'Test Brand',
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          products: [],
        },
      ];
      (prisma.brand.findMany as jest.Mock).mockResolvedValue(brands);

      expect(await service.findAll()).toEqual(brands);
    });
  });

  describe('findOne', () => {
    it('should return a brand', async () => {
      const brand = {
        id: 1,
        name: 'Test Brand',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        products: [],
      };
      (prisma.brand.findUnique as jest.Mock).mockResolvedValue(brand);

      expect(await service.findOne(1)).toEqual(brand);
    });

    it('should throw NotFoundException if brand not found', async () => {
      (prisma.brand.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a brand', async () => {
      const updateBrandDto: UpdateBrandDto = { name: 'Updated Brand' };
      const expectedBrand = {
        id: 1,
        name: 'Updated Brand',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (prisma.brand.update as jest.Mock).mockResolvedValue(expectedBrand);

      expect(await service.update(1, updateBrandDto)).toEqual(expectedBrand);
    });
  });

  describe('remove', () => {
    it('should remove a brand', async () => {
      const expectedBrand = {
        id: 1,
        name: 'Updated Brand',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (prisma.brand.delete as jest.Mock).mockResolvedValue(expectedBrand);

      expect(await service.remove(1)).toEqual(expectedBrand);
    });
  });
});

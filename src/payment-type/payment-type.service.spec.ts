import { Test, TestingModule } from '@nestjs/testing';
import { PaymentTypeService } from './payment-type.service';
import { PrismaService } from '../../src/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { CreatePaymentTypeDto } from './dto/create-payment-type.dto';
import { UpdatePaymentTypeDto } from './dto/update-payment-type.dto';

describe('PaymentTypeService', () => {
  let service: PaymentTypeService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentTypeService, PrismaService],
    }).compile();

    service = module.get<PaymentTypeService>(PaymentTypeService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new payment type', async () => {
      const createPaymentTypeDto: CreatePaymentTypeDto = {
        name: 'Credit Card',
      };
      jest
        .spyOn(prismaService.paymentType, 'create')
        .mockResolvedValue(createPaymentTypeDto as any);

      expect(await service.create(createPaymentTypeDto)).toEqual(
        createPaymentTypeDto,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of payment types', async () => {
      const paymentTypes = [{ id: 1, name: 'Credit Card', Orders: [] }];
      jest
        .spyOn(prismaService.paymentType, 'findMany')
        .mockResolvedValue(paymentTypes as any);

      expect(await service.findAll()).toEqual(paymentTypes);
    });
  });

  describe('findOne', () => {
    it('should return a payment type by id', async () => {
      const paymentType = { id: 1, name: 'Credit Card', Orders: [] };
      jest
        .spyOn(prismaService.paymentType, 'findUnique')
        .mockResolvedValue(paymentType as any);

      expect(await service.findOne(1)).toEqual(paymentType);
    });

    it('should throw NotFoundException if payment type not found', async () => {
      jest
        .spyOn(prismaService.paymentType, 'findUnique')
        .mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a payment type', async () => {
      const updatePaymentTypeDto: UpdatePaymentTypeDto = { name: 'Debit Card' };
      const updatedPaymentType = { id: 1, ...updatePaymentTypeDto };
      jest
        .spyOn(prismaService.paymentType, 'update')
        .mockResolvedValue(updatedPaymentType as any);

      expect(await service.update(1, updatePaymentTypeDto)).toEqual(
        updatedPaymentType,
      );
    });
  });

  describe('remove', () => {
    it('should remove a payment type', async () => {
      const removedPaymentType = { id: 1, name: 'Credit Card' };
      jest
        .spyOn(prismaService.paymentType, 'delete')
        .mockResolvedValue(removedPaymentType as any);

      expect(await service.remove(1)).toEqual(removedPaymentType);
    });
  });
});

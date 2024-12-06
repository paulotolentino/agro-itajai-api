import { Test, TestingModule } from '@nestjs/testing';
import { PaymentTypeController } from './payment-type.controller';
import { PaymentTypeService } from './payment-type.service';
import { CreatePaymentTypeDto } from './dto/create-payment-type.dto';
import { UpdatePaymentTypeDto } from './dto/update-payment-type.dto';

describe('PaymentTypeController', () => {
  let controller: PaymentTypeController;
  let service: PaymentTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentTypeController],
      providers: [
        {
          provide: PaymentTypeService,
          useValue: {
            create: jest.fn().mockResolvedValue({}),
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue({}),
            update: jest.fn().mockResolvedValue({}),
            remove: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    controller = module.get<PaymentTypeController>(PaymentTypeController);
    service = module.get<PaymentTypeService>(PaymentTypeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a payment type', async () => {
      const dto: CreatePaymentTypeDto = { name: 'Credit Card' };
      await expect(controller.create(dto)).resolves.toEqual({});
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of payment types', async () => {
      await expect(controller.findAll()).resolves.toEqual([]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single payment type', async () => {
      const id = '1';
      await expect(controller.findOne(id)).resolves.toEqual({});
      expect(service.findOne).toHaveBeenCalledWith(+id);
    });
  });

  describe('update', () => {
    it('should update a payment type', async () => {
      const id = '1';
      const dto: UpdatePaymentTypeDto = { name: 'Debit Card' };
      await expect(controller.update(id, dto)).resolves.toEqual({});
      expect(service.update).toHaveBeenCalledWith(+id, dto);
    });
  });

  describe('remove', () => {
    it('should remove a payment type', async () => {
      const id = '1';
      await expect(controller.remove(id)).resolves.toEqual({});
      expect(service.remove).toHaveBeenCalledWith(+id);
    });
  });
});

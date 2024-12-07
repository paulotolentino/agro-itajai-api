import { Test, TestingModule } from '@nestjs/testing';
import { DebitPaymentController } from './debit-payment.controller';
import { DebitPaymentService } from './debit-payment.service';

describe('DebitPaymentController', () => {
  let controller: DebitPaymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DebitPaymentController],
      providers: [DebitPaymentService],
    }).compile();

    controller = module.get<DebitPaymentController>(DebitPaymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

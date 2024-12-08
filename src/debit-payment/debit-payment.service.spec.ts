import { Test, TestingModule } from '@nestjs/testing';
import { DebitPaymentService } from './debit-payment.service';

describe('DebitPaymentService', () => {
  let service: DebitPaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DebitPaymentService],
    }).compile();

    service = module.get<DebitPaymentService>(DebitPaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

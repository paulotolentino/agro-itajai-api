import { Test, TestingModule } from '@nestjs/testing';
import { CashBalanceService } from './cash-balance.service';

describe('CashBalanceService', () => {
  let service: CashBalanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CashBalanceService],
    }).compile();

    service = module.get<CashBalanceService>(CashBalanceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

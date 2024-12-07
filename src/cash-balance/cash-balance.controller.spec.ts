import { Test, TestingModule } from '@nestjs/testing';
import { CashBalanceController } from './cash-balance.controller';
import { CashBalanceService } from './cash-balance.service';

describe('CashBalanceController', () => {
  let controller: CashBalanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CashBalanceController],
      providers: [CashBalanceService],
    }).compile();

    controller = module.get<CashBalanceController>(CashBalanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

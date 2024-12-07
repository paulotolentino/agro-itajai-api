import { Module } from '@nestjs/common';
import { CashBalanceService } from './cash-balance.service';
import { CashBalanceController } from './cash-balance.controller';

@Module({
  controllers: [CashBalanceController],
  providers: [CashBalanceService],
})
export class CashBalanceModule {}

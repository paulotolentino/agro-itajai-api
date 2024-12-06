import { Module } from '@nestjs/common';
import { CashOutService } from './cash-out.service';
import { CashOutController } from './cash-out.controller';

@Module({
  controllers: [CashOutController],
  providers: [CashOutService],
})
export class CashOutModule {}

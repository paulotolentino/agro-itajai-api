import { Module } from '@nestjs/common';
import { CashInService } from './cash-in.service';
import { CashInController } from './cash-in.controller';

@Module({
  controllers: [CashInController],
  providers: [CashInService],
})
export class CashInModule {}

import { Module } from '@nestjs/common';
import { StockEntriesService } from './stock-entries.service';
import { StockEntriesController } from './stock-entries.controller';

@Module({
  controllers: [StockEntriesController],
  providers: [StockEntriesService],
})
export class StockEntriesModule {}

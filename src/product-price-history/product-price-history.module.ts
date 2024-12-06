import { Module } from '@nestjs/common';
import { ProductPriceHistoryService } from './product-price-history.service';
import { ProductPriceHistoryController } from './product-price-history.controller';

@Module({
  controllers: [ProductPriceHistoryController],
  providers: [ProductPriceHistoryService],
})
export class ProductPriceHistoryModule {}

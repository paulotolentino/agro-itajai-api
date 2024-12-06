import { Test, TestingModule } from '@nestjs/testing';
import { ProductPriceHistoryController } from './product-price-history.controller';
import { ProductPriceHistoryService } from './product-price-history.service';

describe('ProductPriceHistoryController', () => {
  let controller: ProductPriceHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductPriceHistoryController],
      providers: [ProductPriceHistoryService],
    }).compile();

    controller = module.get<ProductPriceHistoryController>(ProductPriceHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

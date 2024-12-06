import { Test, TestingModule } from '@nestjs/testing';
import { ProductPriceHistoryService } from './product-price-history.service';

describe('ProductPriceHistoryService', () => {
  let service: ProductPriceHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductPriceHistoryService],
    }).compile();

    service = module.get<ProductPriceHistoryService>(ProductPriceHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { PartialType } from '@nestjs/mapped-types';
import { CreateProductPriceHistoryDto } from './create-product-price-history.dto';

export class UpdateProductPriceHistoryDto extends PartialType(CreateProductPriceHistoryDto) {}

import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductPriceHistoryDto {
  createdById: number;

  @ApiProperty({ example: 100, description: 'Novo preço de venda do produto' })
  @IsNumber()
  newPrice: number;

  @ApiProperty({ example: 1, description: 'Id do produto' })
  @IsNumber()
  productId: number;

  @ApiProperty({ example: 100, description: 'Novo preço de custo do produto' })
  @IsNumber()
  newCost: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateStockOutDto {
  createdById: number;
  storeId: number;

  @ApiProperty({ example: 1, description: 'ID do produto' })
  @IsNumber()
  productId: number;

  @ApiProperty({ example: 15, description: 'Quantidade retirada' })
  @IsNumber()
  quantity: number;
}

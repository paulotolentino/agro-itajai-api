import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStockEntryDto {
  createdById: number;

  @ApiProperty({ example: 1, description: 'ID da categoria' })
  @IsNumber()
  productId: number;

  @ApiProperty({ example: 15, description: 'Quantidade comprada' })
  @IsNumber()
  quantity: number;

  @ApiProperty({
    example: 100,
    description: 'Valor de custo unitátio do produto',
  })
  @IsNumber()
  unitCost: number;

  @ApiProperty({
    example: 100,
    description: 'Valor de venda unitário do produto',
  })
  @IsNumber()
  unitPrice: number;
}

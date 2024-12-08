import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderItemDto {
  @ApiProperty({ example: 1, description: 'Id do pedido' })
  orderId?: number;

  @ApiProperty({ example: 1, description: 'Id do produto' })
  @IsNumber()
  productId: number;

  @ApiProperty({ example: 1, description: 'Quantidade' })
  @IsNumber()
  quantity: number;
}

import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderItemDto {
  @ApiProperty({ example: 1, description: 'Quantidade' })
  @IsNumber()
  quantity: number;
}

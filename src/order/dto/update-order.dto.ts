import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderDto {
  @ApiProperty({ example: 1, description: 'Id do status' })
  @IsNumber()
  statusId: number;

  @ApiProperty({ example: 10, description: 'Valor do desconto' })
  @IsNumber()
  discount: number;

  @ApiProperty({ example: 1, description: 'Id do tipo do pagamento' })
  @IsNumber()
  paymentTypeId: number;
}

import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDebitPaymentDto {
  @ApiProperty({ example: 100, description: 'Valor Pago' })
  @IsNumber()
  amount: number;
}

import { IsDate, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDebitPaymentDto {
  createdById: number;

  @ApiProperty({ example: 1, description: 'Id do Cliente' })
  @IsNumber()
  customerId: number;

  @ApiProperty({ example: 100, description: 'Valor Pago' })
  @IsNumber()
  amount: number;

  @ApiProperty({ example: '2021-01-01', description: 'Data do Pagamento' })
  @IsDate()
  date: Date;
}

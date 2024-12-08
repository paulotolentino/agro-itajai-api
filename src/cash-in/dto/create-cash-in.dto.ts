import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCashInDto {
  @ApiProperty({
    example: 120.5,
    description: 'Valor de entrada no caixa',
  })
  @IsNumber()
  amount: number;
  createdById: number;

  @ApiProperty({
    example: 'Entrada de troco',
    description: 'Descrição da entrada',
  })
  description?: string;

  @ApiProperty({
    example: 1,
    description: 'Id do caixa',
  })
  @IsNumber()
  cashBalanceId: number;
}

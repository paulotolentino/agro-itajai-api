import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCashOutDto {
  @ApiProperty({
    example: 120.5,
    description: 'Valor de saída no caixa',
  })
  @IsNumber()
  amount: number;

  createdById: number;

  @ApiProperty({
    example: 'Saída de troco',
    description: 'Descrição da saída',
  })
  description?: string;

  @ApiProperty({
    example: 1,
    description: 'Id do caixa',
  })
  @IsNumber()
  cashBalanceId: number;
}

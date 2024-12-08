import { IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCashBalanceDto {
  @ApiProperty({
    example: 120.5,
    description: 'Valor de atualização do caixa',
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    example: false,
    description: 'Indica se o caixa deve ser fechado ou aberto',
  })
  @IsBoolean()
  closed: boolean;
}

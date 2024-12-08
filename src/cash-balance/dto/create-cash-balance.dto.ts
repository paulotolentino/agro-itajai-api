import { IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCashBalanceDto {
  createdById: number;

  @ApiProperty({
    example: '2024-12-07',
    description: 'Data de abertura do caixa',
  })
  @IsDate()
  date: Date;
}

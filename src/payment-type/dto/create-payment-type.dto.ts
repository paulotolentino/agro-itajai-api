import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentTypeDto {
  @ApiProperty({ example: 'Débito', description: 'Nome do tipo de pagamento' })
  @IsNotEmpty()
  name: string;
}

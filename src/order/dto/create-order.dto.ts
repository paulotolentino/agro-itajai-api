import { IsDate, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateOrderItemDto } from 'src/order-item/dto/create-order-item.dto';

export class CreateOrderDto {
  createdById: number;

  @ApiProperty({ example: 1, description: 'Id do Cliente' })
  @IsNumber()
  customerId: number;

  @ApiProperty({ description: 'Lista de itens do pedido' })
  orderItems: CreateOrderItemDto[];

  @ApiProperty({ example: 10, description: 'Valor do desconto' })
  @IsNumber()
  discount: number;

  @ApiProperty({ example: 1, description: 'Id do status' })
  @IsNumber()
  statusId: number;

  @ApiProperty({ example: 1, description: 'Id do tipo do pagamento' })
  @IsNumber()
  paymentTypeId: number;

  @ApiProperty({ example: '2021-01-01', description: 'Data do pedido' })
  @IsDate()
  date: Date;
}

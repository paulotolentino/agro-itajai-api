import { CreateOrderItemDto } from 'src/order-item/dto/create-order-item.dto';

export class CreateOrderDto {
  customerId: number;
  createdById: number;
  orderItems: CreateOrderItemDto[];
  discount: number;
  statusId: number;
  paymentTypeId: number;
  date: Date;
}

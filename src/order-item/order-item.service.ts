import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderItemService {
  constructor(private prismaService: PrismaService) {}
  create(createOrderItemDto: CreateOrderItemDto) {
    return 'This action adds a new orderItem';
  }

  findAll() {
    return `This action returns all orderItem`;
  }

  async findOne(id: number) {
    const orderItem = await this.prismaService.orderItem.findUnique({
      where: { id },
    });

    if (!orderItem) {
      throw new NotFoundException('OrderItem not found');
    }

    return orderItem;
  }

  async update(id: number, updateOrderItemDto: UpdateOrderItemDto) {
    await this.findOne(id);
    return await this.prismaService.orderItem.update({
      where: { id },
      data: {
        quantity: updateOrderItemDto.quantity,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.prismaService.orderItem.delete({
      where: { id },
    });
  }
}

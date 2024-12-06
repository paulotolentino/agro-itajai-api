import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentTypeDto } from './dto/create-payment-type.dto';
import { UpdatePaymentTypeDto } from './dto/update-payment-type.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PaymentTypeService {
  constructor(private prismaService: PrismaService) {}
  async create(createPaymentTypeDto: CreatePaymentTypeDto) {
    // create a paymentType using Prisma client
    const paymentType = await this.prismaService.paymentType.create({
      data: createPaymentTypeDto,
    });

    return paymentType;
  }

  async findAll() {
    const paymentTypes = await this.prismaService.paymentType.findMany({
      include: { Orders: true },
    });
    return paymentTypes;
  }

  async findOne(id: number) {
    const paymentType = await this.prismaService.paymentType.findUnique({
      where: { id },
      include: { Orders: true },
    });

    if (!paymentType) {
      throw new NotFoundException('PaymentType not found');
    }

    return paymentType;
  }

  async update(id: number, updatePaymentTypeDto: UpdatePaymentTypeDto) {
    await this.findOne(id);
    const paymentType = await this.prismaService.paymentType.update({
      where: { id },
      data: updatePaymentTypeDto,
    });

    return paymentType;
  }

  async remove(id: number) {
    await this.findOne(id);

    return await this.prismaService.paymentType.delete({
      where: { id },
    });
  }
}

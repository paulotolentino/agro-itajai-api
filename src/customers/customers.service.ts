import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CustomersService {
  constructor(private prismaService: PrismaService) {}
  async create(createCustomerDto: CreateCustomerDto) {
    const userData = {
      ...createCustomerDto,
      statusId: 1, // Status de usuário ativo
    };
    const customer = await this.prismaService.customer.create({
      data: userData,
    });

    return customer;
  }

  async findAll() {
    return await this.prismaService.customer.findMany({
      include: {
        CreatedBy: true,
        DebitPayment: true,
        Orders: true,
        Status: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prismaService.customer.findUnique({
      where: {
        id,
      },
      include: {
        CreatedBy: true,
        DebitPayment: true,
        Orders: true,
        Status: true,
      },
    });
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    await this.findOne(id);
    return await this.prismaService.customer.update({
      where: {
        id,
      },
      data: updateCustomerDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.prismaService.customer.delete({
      where: {
        id,
      },
    });
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { createdBy } from 'src/utils/createdByUser';

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
    const customers = await this.prismaService.customer.findMany({
      include: {
        CreatedBy: createdBy,
        DebitPayment: true,
        Orders: true,
        Status: true,
      },
    });

    return customers.map((customer) => {
      const debitsPaid = customer.DebitPayment.filter(
        (payment) => !payment.arquivedDate,
      );
      const totalDebitPaid = debitsPaid.reduce(
        (acc, payment) => acc + payment.amount,
        0,
      );
      const debits = customer.Orders.filter(
        (order) =>
          (order.statusId === 2 || order.statusId === 4) &&
          order.paymentTypeId === 5,
      );
      const totalDebit = debits.reduce((acc, order) => acc + order.total, 0);

      return {
        ...customer,
        debits,
        totalDebit,
        debitsPaid,
        totalDebitPaid,
      };
    });
  }

  async findOne(id: number) {
    const customer = await this.prismaService.customer.findUnique({
      where: {
        id,
      },
      include: {
        CreatedBy: createdBy,
        DebitPayment: true,
        Orders: true,
        Status: true,
      },
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }
    const debitsPaid = customer.DebitPayment.filter(
      (payment) => !payment.arquivedDate,
    );
    const totalDebitPaid = debitsPaid.reduce(
      (acc, payment) => acc + payment.amount,
      0,
    );
    const debits = customer.Orders.filter(
      (order) =>
        (order.statusId === 2 || order.statusId === 4) &&
        order.paymentTypeId === 5,
    );
    const totalDebit = debits.reduce((acc, order) => acc + order.total, 0);

    return {
      ...customer,
      debits,
      totalDebit,
      debitsPaid,
      totalDebitPaid,
    };
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

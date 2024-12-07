import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDebitPaymentDto } from './dto/create-debit-payment.dto';
// import { UpdateDebitPaymentDto } from './dto/update-debit-payment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CustomersService } from 'src/customers/customers.service';
import { CashBalanceService } from 'src/cash-balance/cash-balance.service';

@Injectable()
export class DebitPaymentService {
  customersService: CustomersService = new CustomersService(this.prismaService);
  cashBalanceService: CashBalanceService = new CashBalanceService(
    this.prismaService,
  );
  constructor(private prismaService: PrismaService) {}
  async create(createDebitPaymentDto: CreateDebitPaymentDto) {
    const customer = await this.customersService.findOne(
      createDebitPaymentDto.customerId,
    );
    const customerDebitValue = customer.totalDebit;
    const customerDebit = customer.debits;

    const activePayments = customer.debitsPaid;
    const totalDebitPaid = customer.totalDebitPaid;
    return await this.prismaService.$transaction(async (tx) => {
      if (totalDebitPaid + createDebitPaymentDto.amount >= customerDebitValue) {
        const debitPaymentRequest = tx.debitPayment.create({
          data: {
            customerId: customer.id,
            amount: createDebitPaymentDto.amount,
            createdById: createDebitPaymentDto.createdById,
            arquivedDate: formatDate(new Date()),
          },
        });

        const customerPaymentPromises = activePayments.map(async (payment) => {
          return await tx.debitPayment.update({
            where: {
              id: payment.id,
            },
            data: {
              arquivedDate: formatDate(new Date()),
            },
          });
        });

        const customerDebitPromises = customerDebit.map(async (order) => {
          return await tx.order.update({
            where: {
              id: order.id,
            },
            data: {
              statusId: 1,
            },
          });
        });
        const customerUpdateResponse = tx.customer.update({
          where: {
            id: customer.id,
          },
          data: {
            statusId: 1,
          },
        });
        const [debitPayment] = await Promise.all([
          debitPaymentRequest,
          customerUpdateResponse,
          ...customerPaymentPromises,
          ...customerDebitPromises,
        ]);

        return debitPayment;
      }
      const debitPayment = await tx.debitPayment.create({
        data: {
          customerId: customer.id,
          amount: createDebitPaymentDto.amount,
          createdById: createDebitPaymentDto.createdById,
        },
      });

      return debitPayment;
    });
  }

  async findAll() {
    return await this.prismaService.debitPayment.findMany({
      include: {
        CreatedBy: true,
        Customer: true,
      },
    });
  }

  async findOne(id: number) {
    const debitPayment = await this.prismaService.debitPayment.findUnique({
      where: {
        id,
      },
      include: {
        CreatedBy: true,
        Customer: true,
      },
    });

    if (!debitPayment) {
      throw new NotFoundException('Debit payment not found');
    }

    return debitPayment;
  }

  async findByCustomerId(customerId: number) {
    await this.customersService.findOne(customerId);
    return await this.prismaService.debitPayment.findMany({
      where: {
        customerId,
        arquivedDate: null,
      },
    });
  }

  // async update(id: number, updateDebitPaymentDto: UpdateDebitPaymentDto) {
  //   return `This action updates a #${id} debitPayment`;
  // }

  // async remove(id: number) {
  //   return `This action removes a #${id} debitPayment`;
  // }
}

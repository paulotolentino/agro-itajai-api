import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCashBalanceDto } from './dto/create-cash-balance.dto';
import { UpdateCashBalanceDto } from './dto/update-cash-balance.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { createdBy } from 'src/utils/createdByUser';
import { formatDate } from 'src/utils/date';

@Injectable()
export class CashBalanceService {
  constructor(private prismaService: PrismaService) {}
  async create(createCashBalanceDto: CreateCashBalanceDto) {
    // Find if there is a cash balance for the date or if there is an open cash balance
    await Promise.all([
      this.verifyDateAvailability(
        createCashBalanceDto.date,
        createCashBalanceDto.storeId,
      ),
      this.verifyCashBalanceOpenAvailability(createCashBalanceDto.storeId),
    ]);

    const date = formatDate(createCashBalanceDto.date);

    // If there is no cash balance for the date, create a new one
    return await this.prismaService.cashBalance.create({
      data: {
        amount: 0,
        date,
        createdById: createCashBalanceDto.createdById,
        closed: false,
        storeId: createCashBalanceDto.storeId,
      },
    });
  }

  async close(id: number) {
    const cashBalance = await this.findOne(id);

    if (cashBalance.closed) {
      throw new ConflictException('CashBalance already closed');
    }

    return await this.prismaService.cashBalance.update({
      where: { id },
      data: {
        closed: true,
      },
    });
  }

  async reopen(id: number) {
    const cashBalance = await this.findOne(id);

    if (!cashBalance.closed) {
      throw new ConflictException('CashBalance already open');
    }

    return await this.prismaService.cashBalance.update({
      where: { id },
      data: {
        closed: false,
      },
    });
  }

  async findAll() {
    const cashBalances = await this.prismaService.cashBalance.findMany({
      include: {
        CreatedBy: createdBy,
        CashIns: true,
        CashOuts: true,
        Orders: true,
        Store: true,
        DebitPayment: {
          include: {
            Customer: true,
          },
        },
      },
    });
    return cashBalances;
  }

  async findLast3AndNotClosedByStoreId(storeId: number) {
    // TODO validar se a query está correta
    const openCashBalances = await this.prismaService.cashBalance.findMany({
      include: {
        CreatedBy: true,
        CashIns: true,
        CashOuts: true,
        Orders: {
          include: {
            PaymentType: true,
            Items: {
              include: {
                Product: true,
              },
            },
          },
        },
        Store: true,
        DebitPayment: {
          include: {
            Customer: true,
          },
        },
      },
      where: { closed: false, storeId },
      orderBy: { date: 'desc' }, // Opcional, dependendo da ordem desejada
    });

    const closedCashBalances = await this.prismaService.cashBalance.findMany({
      include: {
        CreatedBy: true,
        CashIns: true,
        CashOuts: true,
        Orders: true,
        Store: true,
        DebitPayment: {
          include: {
            Customer: true,
          },
        },
      },
      where: { closed: true, storeId },
      take: 3,
      orderBy: { date: 'desc' },
    });

    // Combine os resultados
    const cashBalances = [...openCashBalances, ...closedCashBalances];
    return cashBalances;
  }

  async findAllByStoreId(id: number) {
    const cashBalances = await this.prismaService.cashBalance.findMany({
      include: {
        CreatedBy: createdBy,
        CashIns: true,
        CashOuts: true,
        Orders: true,
        Store: true,
        DebitPayment: {
          include: {
            Customer: true,
          },
        },
      },
      where: { storeId: id },
      orderBy: { date: 'desc' },
    });
    return cashBalances;
  }

  async findAllByStoreIdByMonthYear(storeId: number, date: Date) {
    const cashBalances = await this.prismaService.cashBalance.findMany({
      include: {
        CreatedBy: createdBy,
        CashIns: true,
        CashOuts: true,
        Orders: true,
        Store: true,
        DebitPayment: {
          include: {
            Customer: true,
          },
        },
      },
      where: {
        storeId,
        date: {
          gte: new Date(date.getFullYear(), date.getMonth(), 1),
          lt: new Date(date.getFullYear(), date.getMonth() + 1, 1),
        },
      },
      orderBy: { date: 'desc' },
    });
    return cashBalances;
  }

  async findOne(id: number) {
    const cashBalance = await this.prismaService.cashBalance.findUnique({
      where: { id },
      include: {
        CreatedBy: createdBy,
        CashIns: true,
        CashOuts: true,
        Orders: true,
        Store: true,
      },
    });

    if (!cashBalance) {
      throw new NotFoundException('CashBalance not found');
    }

    return cashBalance;
  }
  // get month profit
  async profit(storeId: number, monthYear: Date) {
    const date = new Date(monthYear);
    const cashBalances = await this.prismaService.cashBalance.findMany({
      where: {
        storeId,
        date: {
          gte: new Date(date.getFullYear(), date.getMonth(), 1),
          lt: new Date(date.getFullYear(), date.getMonth() + 1, 1),
        },
      },
      include: {
        Orders: {
          include: {
            Items: true,
          },
        },
      },
    });

    const price = cashBalances.reduce((acc, curr) => {
      return acc + curr.amount;
    }, 0);

    const cost = cashBalances.reduce((acc, curr) => {
      return (
        acc +
        curr.Orders.reduce((acc, curr) => {
          return (
            acc +
            curr.Items.reduce((acc, curr) => {
              return acc + curr.unitCost * curr.quantity;
            }, 0)
          );
        }, 0)
      );
    }, 0);

    return { price, cost };
  }

  async verifyCashBalanceOpenAvailability(storeId: number) {
    const cashBalance = await this.prismaService.cashBalance.findFirst({
      where: { closed: false, storeId },
    });

    if (cashBalance) {
      throw new ConflictException({
        message: 'CashBalance already open',
        cashBalance: cashBalance,
      });
    }
  }

  async findByDate(dateToSearchFor: Date, storeId: number) {
    const date = formatDate(dateToSearchFor);
    const cashBalance = await this.prismaService.cashBalance.findFirst({
      where: { date, storeId },
      include: {
        CreatedBy: createdBy,
        CashIns: true,
        CashOuts: true,
        Store: true,
      },
    });

    if (!cashBalance) {
      throw new NotFoundException('CashBalance not found');
    }

    return cashBalance;
  }

  async verifyDateAvailability(dateToSearchFor: Date, storeId: number) {
    const date = formatDate(dateToSearchFor);
    const cashBalance = await this.prismaService.cashBalance.findFirst({
      where: { date, storeId },
    });

    if (cashBalance) {
      throw new ConflictException({
        mesasge: 'CashBalance already exists',
        cashBalance: cashBalance,
      });
    }
  }

  async update(id: number, updateCashBalanceDto: UpdateCashBalanceDto) {
    await this.findOne(id);
    return await this.prismaService.cashBalance.update({
      where: { id },
      data: {
        closed: updateCashBalanceDto.closed,
      },
    });
  }

  // async remove(id: number) {
  //   await this.findOne(id);
  //   return await this.prismaService.cashBalance.delete({
  //     where: { id },
  //   });
  // }
}

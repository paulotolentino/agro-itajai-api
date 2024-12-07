import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCashBalanceDto } from './dto/create-cash-balance.dto';
import { UpdateCashBalanceDto } from './dto/update-cash-balance.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { createdBy } from 'src/createdByUser';

@Injectable()
export class CashBalanceService {
  constructor(private prismaService: PrismaService) {}
  async create(createCashBalanceDto: CreateCashBalanceDto) {
    // create a cashBalance using prisma
    new Date(createCashBalanceDto.date);
    const cashBalance = await this.prismaService.cashBalance.create({
      data: {
        amount: 0,
        date: createCashBalanceDto.date,
        createdById: createCashBalanceDto.createdById,
        closed: false,
      },
    });

    return cashBalance;
  }

  async findAll() {
    const cashBalances = await this.prismaService.cashBalance.findMany({
      include: { CreatedBy: createdBy, CashIns: true, CashOuts: true },
    });
    return cashBalances;
  }

  async findOne(id: number) {
    const cashBalance = await this.prismaService.cashBalance.findUnique({
      where: { id },
      include: { CreatedBy: createdBy, CashIns: true, CashOuts: true },
    });

    if (!cashBalance) {
      throw new NotFoundException('CashBalance not found');
    }

    return cashBalance;
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

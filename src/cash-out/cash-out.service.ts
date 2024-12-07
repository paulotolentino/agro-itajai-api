import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCashOutDto } from './dto/create-cash-out.dto';
import { UpdateCashOutDto } from './dto/update-cash-out.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CashBalanceService } from 'src/cash-balance/cash-balance.service';
import { createdBy } from 'src/utils/createdByUser';

@Injectable()
export class CashOutService {
  cashBalanceService: CashBalanceService = new CashBalanceService(
    this.prismaService,
  );
  constructor(private prismaService: PrismaService) {}
  async create(createCashOutDto: CreateCashOutDto) {
    const cashBalance = await this.cashBalanceService.findOne(
      createCashOutDto.cashBalanceId,
    );

    return await this.prismaService.$transaction(async (tx) => {
      const cashIn = await tx.cashIn.create({
        data: {
          amount: createCashOutDto.amount,
          description: createCashOutDto.description,
          createdById: createCashOutDto.createdById,
          cashBalanceId: cashBalance.id,
        },
      });

      await tx.cashBalance.update({
        where: { id: cashBalance.id },
        data: {
          amount: {
            decrement: createCashOutDto.amount,
          },
        },
      });

      return cashIn;
    });
  }

  async findAll() {
    return await this.prismaService.cashOut.findMany({
      include: { CreatedBy: createdBy, CashBalance: true },
    });
  }

  async findOne(id: number) {
    const cashout = await this.prismaService.cashOut.findUnique({
      where: { id },
      include: { CreatedBy: createdBy, CashBalance: true },
    });

    if (!cashout) {
      throw new NotFoundException('CashOut not found');
    }

    return cashout;
  }

  async update(id: number, updateCashOutDto: UpdateCashOutDto) {
    const cashout = await this.findOne(id);
    return await this.prismaService.$transaction(async (tx) => {
      const cashOut = await tx.cashOut.update({
        where: { id },
        data: {
          amount: updateCashOutDto.amount,
          description: updateCashOutDto.description,
        },
      });

      if (updateCashOutDto.amount !== cashout.amount) {
        await tx.cashBalance.update({
          where: { id: updateCashOutDto.cashBalanceId },
          data: {
            amount: {
              increment: updateCashOutDto.amount,
              decrement: cashout.amount,
            },
          },
        });
      }
      return cashOut;
    });
  }

  async remove(id: number) {
    const cashOut = await this.findOne(id);
    return await this.prismaService.$transaction(async (tx) => {
      await tx.cashBalance.update({
        where: { id: cashOut.cashBalanceId },
        data: {
          amount: {
            increment: cashOut.amount,
          },
        },
      });

      return await tx.cashOut.delete({
        where: { id },
      });
    });
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCashInDto } from './dto/create-cash-in.dto';
import { UpdateCashInDto } from './dto/update-cash-in.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CashBalanceService } from 'src/cash-balance/cash-balance.service';
import { createdBy } from 'src/utils/createdByUser';

@Injectable()
export class CashInService {
  cashBalanceService: CashBalanceService = new CashBalanceService(
    this.prismaService,
  );
  constructor(private prismaService: PrismaService) {}
  async create(createCashInDto: CreateCashInDto) {
    const cashBalance = await this.cashBalanceService.findOne(
      createCashInDto.cashBalanceId,
    );

    return await this.prismaService.$transaction(async (tx) => {
      const cashIn = await tx.cashIn.create({
        data: {
          amount: createCashInDto.amount,
          description: createCashInDto.description,
          createdById: createCashInDto.createdById,
          cashBalanceId: cashBalance.id,
        },
      });

      await tx.cashBalance.update({
        where: { id: cashBalance.id },
        data: {
          amount: {
            increment: createCashInDto.amount,
          },
        },
      });

      return cashIn;
    });
  }

  async findAll() {
    const brands = await this.prismaService.cashIn.findMany({
      include: { CreatedBy: createdBy, CashBalance: true },
    });
    return brands;
  }

  async findOne(id: number) {
    const brand = await this.prismaService.cashIn.findUnique({
      where: { id },
      include: { CreatedBy: createdBy, CashBalance: true },
    });

    if (!brand) {
      throw new NotFoundException('CashIn not found');
    }

    return brand;
  }

  async update(id: number, updateCashInDto: UpdateCashInDto) {
    const cashIn = await this.findOne(id);

    await this.prismaService.$transaction(async (tx) => {
      await tx.cashIn.update({
        where: { id },
        data: {
          amount: updateCashInDto.amount,
          description: updateCashInDto.description,
          createdById: updateCashInDto.createdById,
        },
      });
      if (cashIn.amount !== updateCashInDto.amount) {
        await tx.cashBalance.update({
          where: { id: cashIn.cashBalanceId },
          data: {
            amount: {
              increment: updateCashInDto.amount,
              decrement: cashIn.amount,
            },
          },
        });
      }
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.prismaService.$transaction(async (tx) => {
      const cashIn = await tx.cashIn.findUnique({
        where: { id },
        include: { CashBalance: true },
      });

      await tx.cashBalance.update({
        where: { id: cashIn.cashBalanceId },
        data: {
          amount: {
            decrement: cashIn.amount,
          },
        },
      });

      return await tx.cashIn.delete({
        where: { id },
      });
    });
  }
}

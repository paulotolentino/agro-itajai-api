import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCashBalanceDto } from './dto/create-cash-balance.dto';
import { UpdateCashBalanceDto } from './dto/update-cash-balance.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { createdBy } from 'src/utils/createdByUser';

@Injectable()
export class CashBalanceService {
  constructor(private prismaService: PrismaService) {}
  async create(createCashBalanceDto: CreateCashBalanceDto) {
    // Find if there is a cash balance for the date
    const cashBalance = await this.findByDate(createCashBalanceDto.date);

    // If there is a cash balance for the date, throw an error
    if (cashBalance) {
      throw new ConflictException('CashBalance already exists');
    }

    // If there is no cash balance for the date, create a new one
    return await this.prismaService.cashBalance.create({
      data: {
        amount: 0,
        date: createCashBalanceDto.date,
        createdById: createCashBalanceDto.createdById,
        closed: false,
      },
    });
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

  async findByDate(dateToSearchFor: Date) {
    const date = formatDate(dateToSearchFor);
    const cashBalance = await this.prismaService.cashBalance.findFirst({
      where: { date },
      include: { CreatedBy: createdBy, CashIns: true, CashOuts: true },
    });

    if (!cashBalance) {
      throw new NotFoundException('CashBalance not found');
    }

    return cashBalance;
  }

  async verifyDateAvailability(dateToSearchFor: Date) {
    const date = formatDate(dateToSearchFor);
    const cashBalance = await this.prismaService.cashBalance.findFirst({
      where: { date },
    });

    if (cashBalance) {
      throw new ConflictException('CashBalance already exists');
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

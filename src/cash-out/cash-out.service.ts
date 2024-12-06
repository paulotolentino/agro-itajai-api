import { Injectable } from '@nestjs/common';
import { CreateCashOutDto } from './dto/create-cash-out.dto';
import { UpdateCashOutDto } from './dto/update-cash-out.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CashOutService {
  constructor(private prismaService: PrismaService) {}
  async create(createCashOutDto: CreateCashOutDto) {
    return await this.prismaService.cashOut.create({
      data: createCashOutDto,
    });
  }

  async findAll() {
    return await this.prismaService.cashOut.findMany({
      include: { CreatedBy: true },
    });
  }

  async findOne(id: number) {
    return await this.prismaService.cashOut.findUnique({
      where: { id },
      include: { CreatedBy: true },
    });
  }

  async update(id: number, updateCashOutDto: UpdateCashOutDto) {
    await this.findOne(id);
    return await this.prismaService.cashOut.update({
      where: { id },
      data: updateCashOutDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.prismaService.cashOut.delete({
      where: { id },
    });
  }
}

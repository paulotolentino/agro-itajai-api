import { Injectable } from '@nestjs/common';
import { CreateCashInDto } from './dto/create-cash-in.dto';
import { UpdateCashInDto } from './dto/update-cash-in.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CashInService {
  constructor(private prismaService: PrismaService) {}
  async create(createCashInDto: CreateCashInDto) {
    const brand = await this.prismaService.cashIn.create({
      data: createCashInDto,
    });

    return brand;
  }

  async findAll() {
    const brands = await this.prismaService.cashIn.findMany({
      include: { CreatedBy: true },
    });
    return brands;
  }

  async findOne(id: number) {
    const brand = await this.prismaService.cashIn.findUnique({
      where: { id },
      include: { CreatedBy: true },
    });

    return brand;
  }

  async update(id: number, updateCashInDto: UpdateCashInDto) {
    await this.findOne(id);
    return await this.prismaService.cashIn.update({
      where: { id },
      data: updateCashInDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.prismaService.cashIn.delete({
      where: { id },
    });
  }
}

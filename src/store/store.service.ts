import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { createdBy } from 'src/utils/createdByUser';

@Injectable()
export class StoreService {
  constructor(private prismaService: PrismaService) {}
  async create(createStoreDto: CreateStoreDto) {
    return await this.prismaService.store.create({
      data: {
        ...createStoreDto,
        active: true,
      },
    });
  }

  async findAll() {
    return await this.prismaService.store.findMany({
      include: {
        CreatedBy: createdBy,
        CashBalance: {
          where: { closed: false },
        },
      },
    });
  }

  async findOne(id: number) {
    const store = await this.prismaService.store.findUnique({
      where: { id },
      include: {
        CreatedBy: createdBy,
        CashBalance: {
          where: { closed: false },
        },
      },
    });

    if (!store) {
      throw new NotFoundException('Store not found');
    }

    return store;
  }

  async update(id: number, updateStoreDto: UpdateStoreDto) {
    await this.findOne(id);
    return await this.prismaService.store.update({
      where: { id },
      data: updateStoreDto,
    });
  }

  async remove(id: number) {
    return `This action removes a #${id} store`;
  }
}

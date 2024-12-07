import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { PrismaService } from '../prisma/prisma.service';
import { createdBy } from 'src/utils/createdByUser';

@Injectable()
export class BrandsService {
  constructor(private prismaService: PrismaService) {}
  async create(createBrandDto: CreateBrandDto) {
    // create a brand using prisma
    const brand = await this.prismaService.brand.create({
      data: createBrandDto,
    });

    return brand;
  }

  async findAll() {
    const brands = await this.prismaService.brand.findMany({
      include: { Products: true, CreatedBy: createdBy },
    });
    return brands;
  }

  async findOne(id: number) {
    const brand = await this.prismaService.brand.findUnique({
      where: { id },
      include: { Products: true, CreatedBy: createdBy },
    });

    if (!brand) {
      throw new NotFoundException('Brand not found');
    }

    return brand;
  }

  async update(id: number, updateBrandDto: UpdateBrandDto) {
    await this.findOne(id);
    return await this.prismaService.brand.update({
      where: { id },
      data: updateBrandDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.prismaService.brand.delete({
      where: { id },
    });
  }
}

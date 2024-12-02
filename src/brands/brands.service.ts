import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { PrismaService } from '../prisma/prisma.service';

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
      include: { products: true },
    });
    return brands;
  }

  async findOne(id: number) {
    const brand = await this.prismaService.brand.findUnique({
      where: { id },
      include: { products: true },
    });

    if (!brand) {
      throw new NotFoundException('Brand not found');
    }

    return brand;
  }

  async update(id: number, updateBrandDto: UpdateBrandDto) {
    return await this.prismaService.brand.update({
      where: { id },
      data: updateBrandDto,
    });
  }

  async remove(id: number) {
    return await this.prismaService.brand.delete({
      where: { id },
    });
  }
}

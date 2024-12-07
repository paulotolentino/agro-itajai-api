import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { createdBy } from 'src/utils/createdByUser';

@Injectable()
export class CategoriesService {
  constructor(private prismaService: PrismaService) {}
  async create(createCategoryDto: CreateCategoryDto) {
    return await this.prismaService.category.create({
      data: createCategoryDto,
    });
  }

  async findAll() {
    return await this.prismaService.category.findMany({
      include: { CreatedBy: createdBy, Products: true },
    });
  }

  async findOne(id: number) {
    const product = await this.prismaService.category.findUnique({
      where: { id },
      include: { CreatedBy: createdBy, Products: true },
    });

    if (!product) {
      throw new NotFoundException('Category not found');
    }

    return product;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    await this.findOne(id);
    return await this.prismaService.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.prismaService.category.delete({
      where: { id },
    });
  }
}

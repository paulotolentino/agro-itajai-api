import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

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
      include: { CreatedBy: true, Products: true },
    });
  }

  async findOne(id: number) {
    return await this.prismaService.category.findUnique({
      where: { id },
      include: { CreatedBy: true, Products: true },
    });
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

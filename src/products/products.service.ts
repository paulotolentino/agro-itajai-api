import { Injectable } from '@nestjs/common';
// import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  // async create(createProductDto: CreateProductDto) {
  //   const averageCost = createProductDto.price;
  // }

  async findAll() {
    const products = await this.prisma.product.findMany({
      include: {
        CreatedBy: true,
        Brand: true,
        Category: true,
        PriceHistory: true,
        StockEntries: true,
        Orders: true,
      },
    });
    return products;
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        CreatedBy: true,
        Brand: true,
        Category: true,
        PriceHistory: true,
        StockEntries: true,
        Orders: true,
      },
    });
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.findOne(id);
    return await this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.prisma.product.delete({
      where: { id },
    });
  }
}

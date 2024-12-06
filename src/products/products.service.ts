import { Injectable, NotFoundException } from '@nestjs/common';
// import { CreateProductDto } from './dto/create-product.dto';
// import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { BrandsService } from 'src/brands/brands.service';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class ProductsService {
  brandService: BrandsService = new BrandsService(this.prisma);
  categoriesService: CategoriesService = new CategoriesService(this.prisma);

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

    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  // async update(id: number, updateProductDto: UpdateProductDto) {
  //   await this.findOne(id);
  //   return await this.prisma.product.update({
  //     where: { id },
  //     data: updateProductDto,
  //   });
  // }

  async remove(id: number) {
    await this.findOne(id);
    return await this.prisma.product.delete({
      where: { id },
    });
  }
}

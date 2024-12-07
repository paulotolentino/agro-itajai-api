import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { BrandsService } from 'src/brands/brands.service';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class ProductsService {
  brandService: BrandsService = new BrandsService(this.prisma);
  categoriesService: CategoriesService = new CategoriesService(this.prisma);

  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const brand = await this.brandService.findOne(createProductDto.brandId);
    const category = await this.categoriesService.findOne(
      createProductDto.categoryId,
    );
    return await this.prisma.$transaction(async (tx) => {
      const product = await tx.product.create({
        data: {
          name: createProductDto.name,
          description: createProductDto.description,
          price: createProductDto.price,
          cost: createProductDto.cost,
          averagePrice: createProductDto.price,
          averageCost: createProductDto.cost,
          brandId: brand.id,
          categoryId: category.id,
          createdById: createProductDto.createdById,
          stock: createProductDto.stock,
          active: true,
        },
      });

      await tx.productPriceHistory.create({
        data: {
          productId: product.id,
          newCost: createProductDto.cost,
          newPrice: createProductDto.price,
          oldCost: createProductDto.cost,
          oldPrice: createProductDto.price,
          createdById: createProductDto.createdById,
        },
      });

      await tx.stockEntry.create({
        data: {
          productId: product.id,
          quantity: createProductDto.stock,
          createdById: createProductDto.createdById,
          totalCost: createProductDto.cost * createProductDto.stock,
          unitCost: createProductDto.cost,
          unitPrice: createProductDto.price,
        },
      });

      return product;
    });
  }

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

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.findOne(id);
    return await this.prisma.product.update({
      where: { id },
      data: {
        active: updateProductDto.active,
        brandId: updateProductDto.brandId,
        categoryId: updateProductDto.categoryId,
        description: updateProductDto.description,
        name: updateProductDto.name,
      },
    });
  }

  // async remove(id: number) {
  //   await this.findOne(id);
  //   return await this.prisma.product.delete({
  //     where: { id },
  //   });
  // }
}

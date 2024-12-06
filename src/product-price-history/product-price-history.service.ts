import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductPriceHistoryDto } from './dto/create-product-price-history.dto';
import { UpdateProductPriceHistoryDto } from './dto/update-product-price-history.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class ProductPriceHistoryService {
  productService: ProductsService = new ProductsService(this.prismaService);
  constructor(private prismaService: PrismaService) {}
  async create(createProductPriceHistoryDto: CreateProductPriceHistoryDto) {
    const product = await this.productService.findOne(
      createProductPriceHistoryDto.productId,
    );

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return await this.prismaService.productPriceHistory.create({
      data: createProductPriceHistoryDto,
    });
  }

  async findAll() {
    return await this.prismaService.productPriceHistory.findMany({
      include: {
        Product: true,
        CreatedBy: true,
      },
    });
  }

  async findOne(id: number) {
    const productPriceHistory =
      await this.prismaService.productPriceHistory.findUnique({
        where: { id },
        include: {
          Product: true,
          CreatedBy: true,
        },
      });

    if (!productPriceHistory) {
      throw new NotFoundException('ProductPriceHistory not found');
    }

    return productPriceHistory;
  }

  async update(
    id: number,
    updateProductPriceHistoryDto: UpdateProductPriceHistoryDto,
  ) {
    const product = await this.productService.findOne(
      updateProductPriceHistoryDto.productId,
    );

    if (!product) {
      throw new NotFoundException('Product not found');
    }
    await this.findOne(id);
    return await this.prismaService.productPriceHistory.update({
      where: { id },
      data: updateProductPriceHistoryDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.prismaService.productPriceHistory.delete({
      where: { id },
    });
  }
}

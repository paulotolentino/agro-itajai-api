import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStockOutDto } from './dto/create-stock-out.dto';
import { UpdateStockOutDto } from './dto/update-stock-out.dto';
import { ProductsService } from 'src/products/products.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { createdBy } from 'src/utils/createdByUser';

@Injectable()
export class StockOutService {
  productsService: ProductsService = new ProductsService(this.prismaService);

  constructor(private prismaService: PrismaService) {}

  async create(createStockOutDto: CreateStockOutDto) {
    return this.prismaService.$transaction(async (tx) => {
      const product = await tx.product.findUnique({
        where: { id: createStockOutDto.productId },
      });
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      const stockOut = await tx.stockOut.create({
        data: {
          productId: product.id,
          quantity: createStockOutDto.quantity,
          createdById: createStockOutDto.createdById,
          storeId: product.storeId,
        },
      });
      await tx.product.update({
        where: { id: product.id },
        data: {
          stock: {
            decrement: createStockOutDto.quantity,
          },
        },
      });
      return stockOut;
    });
  }

  async findAll() {
    return await this.prismaService.stockOut.findMany({
      include: { Product: true, CreatedBy: createdBy },
    });
  }

  async findAllByStoreId(id: number) {
    return await this.prismaService.stockOut.findMany({
      include: { Product: true, CreatedBy: createdBy },
      where: { storeId: id },
    });
  }

  async findAllByProductId(id: number) {
    return await this.prismaService.stockOut.findMany({
      include: { Product: true, CreatedBy: createdBy },
      where: { productId: id },
    });
  }

  async findOne(id: number) {
    const stockOut = await this.prismaService.stockOut.findUnique({
      where: { id },
      include: { Product: true, CreatedBy: createdBy },
    });

    if (!stockOut) {
      throw new NotFoundException('StockOut not found');
    }

    return stockOut;
  }

  async update(id: number, updateStockOutDto: UpdateStockOutDto) {
    return `This action updates a #${id} stockOut`;
  }

  async remove(id: number) {
    return `This action removes a #${id} stockOut`;
  }
}

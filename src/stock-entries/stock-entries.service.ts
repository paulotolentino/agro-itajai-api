import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStockEntryDto } from './dto/create-stock-entry.dto';
// import { UpdateStockEntryDto } from './dto/update-stock-entry.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductsService } from 'src/products/products.service';
import { createdBy } from 'src/utils/createdByUser';
import { roundToTwo } from 'src/utils/money';

@Injectable()
export class StockEntriesService {
  productsService: ProductsService = new ProductsService(this.prismaService);
  constructor(private prismaService: PrismaService) {}

  async create(createStockEntryDto: CreateStockEntryDto) {
    try {
      return this.prismaService.$transaction(async (tx) => {
        // Get the product
        const product = await tx.product.findUnique({
          where: { id: createStockEntryDto.productId },
        });
        if (!product) {
          throw new NotFoundException('Product not found');
        }
        const isNewPrice = product.price !== createStockEntryDto.unitPrice;
        if (isNewPrice) {
          await tx.productPriceHistory.create({
            data: {
              newPrice: createStockEntryDto.unitPrice,
              newCost: createStockEntryDto.unitCost,
              createdById: createStockEntryDto.createdById,
              oldPrice: product.price,
              productId: product.id,
              oldCost: product.cost,
            },
          });
        }
        const stockEntry = await tx.stockEntry.create({
          data: {
            productId: product.id,
            quantity: createStockEntryDto.quantity,
            unitCost: createStockEntryDto.unitCost,
            createdById: createStockEntryDto.createdById,
            unitPrice: createStockEntryDto.unitPrice,
            totalCost: roundToTwo(
              createStockEntryDto.quantity * createStockEntryDto.unitCost,
            ),
          },
        });
        const newQuantity = product.stock + createStockEntryDto.quantity;
        const averageCost = roundToTwo(
          (product.stock * product.averageCost +
            createStockEntryDto.quantity * createStockEntryDto.unitCost) /
            newQuantity,
        );
        const averagePrice = roundToTwo(
          (product.stock * product.averagePrice +
            createStockEntryDto.quantity * createStockEntryDto.unitPrice) /
            newQuantity,
        );
        await tx.product.update({
          where: { id: product.id },
          data: {
            stock: newQuantity,
            averageCost,
            averagePrice,
            cost: createStockEntryDto.unitCost,
            price: createStockEntryDto.unitPrice,
          },
        });
        return stockEntry;
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error(`Unable to create stock entry: ${error}`);
      throw new Error('Error creating stock entry');
    }
  }

  async findAll() {
    return await this.prismaService.stockEntry.findMany({
      include: { Product: true, CreatedBy: createdBy },
    });
  }

  async findAllByProductId(id: number) {
    return await this.prismaService.stockEntry.findMany({
      include: { Product: true, CreatedBy: createdBy },
      where: { productId: id },
    });
  }

  async findOne(id: number) {
    const stockEntry = await this.prismaService.stockEntry.findUnique({
      where: { id },
      include: { Product: true, CreatedBy: createdBy },
    });

    if (!stockEntry) {
      throw new NotFoundException('StockEntry not found');
    }

    return stockEntry;
  }

  // async update(id: number, updateStockEntryDto: UpdateStockEntryDto) {
  //   await this.findOne(id);
  //   return await this.prismaService.stockEntry.update({
  //     where: { id },
  //     data: {

  //     },
  //   });
  // }

  // async remove(id: number) {
  //   return `This action removes a #${id} stockEntry`;
  // }
}

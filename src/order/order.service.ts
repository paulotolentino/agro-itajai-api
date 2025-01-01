import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CustomersService } from 'src/customers/customers.service';
import { ProductsService } from 'src/products/products.service';
import { CashBalanceService } from 'src/cash-balance/cash-balance.service';
import { formatDate } from 'src/utils/date';
import { createdBy } from 'src/utils/createdByUser';
import { roundToTwo } from 'src/utils/money';

@Injectable()
export class OrderService {
  customersService: CustomersService = new CustomersService(this.prismaService);
  procutsService: ProductsService = new ProductsService(this.prismaService);
  cashBalanceService: CashBalanceService = new CashBalanceService(
    this.prismaService,
  );
  constructor(private prismaService: PrismaService) {}
  async create(createOrderDto: CreateOrderDto) {
    const date = formatDate(createOrderDto.date);
    const [customer, items, cashBalance] = await Promise.all([
      this.customersService.findOne(createOrderDto.customerId),
      this.procutsService.findAllByIds(
        createOrderDto.orderItems.map((orderItem) => orderItem.productId),
      ),
      this.cashBalanceService.findByDate(date, createOrderDto.storeId),
    ]);
    if (cashBalance.closed) {
      throw new ConflictException('Cash balance is closed');
    }
    return await this.prismaService.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          createdById: createOrderDto.createdById,
          discount: createOrderDto.discount,
          paymentTypeId: createOrderDto.paymentTypeId,
          statusId: createOrderDto.paymentTypeId === 5 ? 2 : 1, // Caso seja Fiado, o status é Em aberto, senão é Pago
          date,
          cashBalanceId: cashBalance.id,
          customerId: customer.id,
          storeId: createOrderDto.storeId,
          total: roundToTwo(
            items.reduce((acc, item) => {
              const orderItem = createOrderDto.orderItems.find(
                (orderItem) => orderItem.productId === item.id,
              );
              return acc + orderItem.quantity * item.price;
            }, 0),
          ),
        },
      });

      const orderItems = createOrderDto.orderItems.map((orderItem) => {
        return tx.orderItem.create({
          data: {
            ...orderItem,
            orderId: order.id,
            unitCost: items.find((item) => item.id === orderItem.productId)
              .cost,
            unitPrice: items.find((item) => item.id === orderItem.productId)
              .price,
          },
        });
      });

      const updateStock = createOrderDto.orderItems.map(async (orderItem) => {
        const orderItemsHistory = await tx.orderItem.findMany({
          where: {
            productId: orderItem.productId,
          },
          include: {
            Product: true,
          },
        });

        const averageSoldPrice = orderItemsHistory.reduce((acc, history) => {
          return acc + history.unitPrice * history.quantity;
        }, 0);

        const sumSoldQuantity = orderItemsHistory.reduce((acc, history) => {
          return acc + history.quantity;
        }, 0);

        // Se não houver histórico de vendas, o preço médio é o preço atual do produto
        // Senão, calcula-se a média ponderada do preço de venda,
        const averagePrice =
          sumSoldQuantity === 0
            ? items.find((item) => item.id === orderItem.productId).price
            : roundToTwo(
                (averageSoldPrice +
                  orderItem.quantity *
                    orderItemsHistory.find(
                      (item) => item.productId === orderItem.productId,
                    ).Product.price) /
                  (sumSoldQuantity + orderItem.quantity),
              );

        return tx.product.update({
          where: {
            id: orderItem.productId,
          },
          data: {
            averagePrice,
            stock: {
              decrement: orderItem.quantity,
            },
          },
        });
      });

      await tx.cashBalance.update({
        where: {
          id: cashBalance.id,
        },
        data: {
          amount: {
            increment: order.total,
          },
        },
      });

      await Promise.all([...orderItems, ...updateStock]);

      return order;
    });
  }

  async findAll() {
    return await this.prismaService.order.findMany({
      include: {
        CreatedBy: createdBy,
        Customer: true,
        Items: true,
        CashBalance: true,
        Status: true,
        PaymentType: true,
      },
    });
  }

  async findAllByStoreId(storeId: number) {
    return await this.prismaService.order.findMany({
      include: {
        CreatedBy: createdBy,
        Customer: true,
        Items: true,
        CashBalance: true,
        Status: true,
        PaymentType: true,
      },
      where: {
        storeId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findAllByDate(dateToSearchFor: Date | string) {
    const date = formatDate(dateToSearchFor);
    return await this.prismaService.order.findMany({
      where: {
        date,
      },
      include: {
        CreatedBy: createdBy,
        Customer: true,
        Items: true,
        CashBalance: true,
        Status: true,
        PaymentType: true,
      },
    });
  }

  async findAllByDateAndStoreId(
    dateToSearchFor: Date | string,
    storeId: number,
  ) {
    const date = formatDate(dateToSearchFor);
    return await this.prismaService.order.findMany({
      where: {
        date,
        storeId,
      },
      include: {
        CreatedBy: createdBy,
        Customer: true,
        Items: {
          include: {
            Product: true,
          },
        },
        CashBalance: true,
        Status: true,
        PaymentType: true,
      },
    });
  }

  async findOne(id: number) {
    const order = await this.prismaService.order.findUnique({
      where: { id },
      include: {
        CreatedBy: createdBy,
        Customer: true,
        Items: true,
        CashBalance: true,
        Status: true,
        PaymentType: true,
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    await this.findOne(id);
    return await this.prismaService.order.update({
      where: { id },
      data: {
        discount: updateOrderDto.discount,
        statusId: updateOrderDto.statusId,
        paymentTypeId: updateOrderDto.paymentTypeId,
      },
    });
  }
}

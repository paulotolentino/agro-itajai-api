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

@Injectable()
export class OrderService {
  customersService: CustomersService = new CustomersService(this.prismaService);
  procutsService: ProductsService = new ProductsService(this.prismaService);
  cashBalanceService: CashBalanceService = new CashBalanceService(
    this.prismaService,
  );
  constructor(private prismaService: PrismaService) {}
  async create(createOrderDto: CreateOrderDto) {
    const [customer, items, cashBalance] = await Promise.all([
      this.customersService.findOne(createOrderDto.customerId),
      this.procutsService.findAllByIds(
        createOrderDto.orderItems.map((orderItem) => orderItem.productId),
      ),
      this.cashBalanceService.findByDate(createOrderDto.date),
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
          statusId: createOrderDto.statusId,
          date: createOrderDto.date,
          cashBalanceId: cashBalance.id,
          customerId: customer.id,
          total: items.reduce((acc, item) => {
            const orderItem = createOrderDto.orderItems.find(
              (orderItem) => orderItem.productId === item.id,
            );
            return acc + orderItem.quantity * item.price;
          }, 0),
        },
      });

      const orderItems = createOrderDto.orderItems.map((orderItem) => {
        return tx.orderItem.create({
          data: {
            ...orderItem,
            orderId: order.id,
            unitPrice: items.find((item) => item.id === orderItem.productId)
              .price,
          },
        });
      });

      const updateStock = createOrderDto.orderItems.map((orderItem) => {
        return tx.product.update({
          where: {
            id: orderItem.productId,
          },
          data: {
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
        CreatedBy: true,
        Customer: true,
        Items: true,
        CashBalance: true,
        Status: true,
        PaymentType: true,
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
        CreatedBy: true,
        Customer: true,
        Items: true,
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
        CreatedBy: true,
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

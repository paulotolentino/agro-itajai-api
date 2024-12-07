import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const result = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });

    const { password, ...user } = result;

    return user;
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      include: {
        CreatedBrands: true,
        CreatedCashIns: true,
        CreatedCashOuts: true,
        CreatedCustomers: true,
        CreatedProducts: true,
        CreatedOrders: true,
        CreatedDebitPayment: true,
        CreatedProductPriceHistories: true,
        CreatedStockEntries: true,
        CreatedCategories: true,
        Status: true,
      },
    }); // Retorna todos os usuários
    const formattedUsers = users.map((user) => {
      const { password, ...formattedUser } = user;
      return formattedUser;
    });
    return formattedUsers;
  }
  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        CreatedBrands: true,
        CreatedCashIns: true,
        CreatedCashOuts: true,
        CreatedCustomers: true,
        CreatedProducts: true,
        CreatedOrders: true,
        CreatedDebitPayment: true,
        CreatedProductPriceHistories: true,
        CreatedStockEntries: true,
        CreatedCategories: true,
        Status: true,
      },
    });
    if (!user) throw new NotFoundException('User not found');
    const { password, ...result } = user;
    return result;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id);
    const { password, ...data } = updateUserDto;
    const { password: pass, ...user } = await this.prisma.user.update({
      where: { id },
      data,
    });

    return user;
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.prisma.user.delete({
      where: { id },
    });
  }
}

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
    const users = await this.prisma.user.findMany(); // Retorna todos os usuários
    const formattedUsers = users.map((user) => {
      const { password, ...formattedUser } = user;
      return formattedUser;
    });
    return formattedUsers;
  }
  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) throw new NotFoundException('User not found');
    const { password, ...result } = user;
    return result;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { password, ...data } = updateUserDto;
    const { password: pass, ...user } = await this.prisma.user.update({
      where: { id },
      data,
    });

    return user;
  }

  async remove(id: number) {
    const result = await this.prisma.user
      .delete({
        where: { id },
      })
      .then(() => true)
      .catch(() => false);

    if (!result) throw new NotFoundException('User not found');
    return { success: true };
  }
}

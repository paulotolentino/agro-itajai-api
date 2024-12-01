import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    // cria um usuário usando o prisma
    const user = await this.prisma.user.create({
      data: createUserDto,
    });

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
    return await this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return await this.prisma.user.delete({
      where: { id },
    });
  }
}

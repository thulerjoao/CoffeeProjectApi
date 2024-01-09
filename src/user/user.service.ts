import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { handleError } from 'src/utils/handleError';

@Injectable()
export class UserService {
  private userSelect = {
    id: true,
    name: true,
    email: true,
    password: false,
    createdAt: false,
    updatedAt: false,
  };

  private userSelectWithCart = {
    id: true,
    name: true,
    email: true,
    password: false,
    createdAt: false,
    updatedAt: false,
    cart: {
      select: {
        totalValue: true,
        products: {
          select: {
            id: true,
            size: true,
            amount: true,
            productId: true,
          },
        },
      },
    },
  };

  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany({
      select: this.userSelect,
    });
  }

  async findOne(id: string): Promise<User> {
    const data = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!data) {
      throw new BadRequestException(`Unavailable ID`);
    }
    return data;
  }

  async findById(id: string): Promise<User> {
    const data = await this.prisma.user.findUnique({
      where: { id },
      select: this.userSelectWithCart,
    });
    if (!data) {
      throw new BadRequestException(`Unavailable ID`);
    }
    return data;
  }

  async create(dto: CreateUserDto): Promise<User> {
    if (dto.confirmPassword !== dto.password) {
      throw new BadRequestException(`Passwords do not march`);
    }
    delete dto.confirmPassword;
    const newCart = { totalValue: 0 };
    // const newCart = {};
    const data: Prisma.UserCreateInput = {
      name: dto.name,
      email: dto.email,
      password: await bcrypt.hash(dto.password, 10),
      cart: {
        create: newCart,
      },
    };
    return this.prisma.user
      .create({
        data,
        select: this.userSelectWithCart,
      })
      .catch(handleError);
  }

  async delete(id: string): Promise<void> {
    const user = await this.findOne(id);
    const cartId = user.cartId;
    await this.prisma.user.delete({ where: { id } }).catch(handleError);
    await this.prisma.cart.delete({ where: { id: cartId } }).catch(handleError);
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    const data: Partial<Prisma.UserCreateInput> = {
      name: dto.name,
      email: dto.email,
      password: await bcrypt.hash(dto.password, 10),
    };
    await this.findById(id);
    return this.prisma.user.update({
      where: { id },
      data,
      select: this.userSelect,
    });
  }
}

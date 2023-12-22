import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handleError';
import { CreateProductCartDto } from './dto/create.productCart.dto';
import { UpdateProductCartDto } from './dto/update.productCart.dto';
import { ProductCart } from './entities/product-cart.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductCartService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.productCart.findMany();
  }

  async findById(id: string): Promise<ProductCart> {
    const data = await this.prisma.productCart.findUnique({ where: { id } });
    if (!data) {
      throw new BadRequestException(`Unavailable ID`);
    }
    return data;
  }

  async create(dto: CreateProductCartDto): Promise<ProductCart> {
    const data: Prisma.ProductCartCreateInput = {
      amount: dto.amount,
      size: dto.size,
      product: {
        connect: {
          id: dto.productId,
        },
      },
      cart: {
        connect: {
          id: dto.cartId,
        },
      },
    };
    return this.prisma.productCart.create({ data }).catch(handleError);
  }

  async delete(id: string): Promise<void> {
    await this.findById(id);
    await this.prisma.productCart.delete({ where: { id } }).catch(handleError);
  }

  async update(id: string, dto: UpdateProductCartDto): Promise<ProductCart> {
    const data: Prisma.ProductCartCreateInput = {
      amount: dto.amount,
      size: dto.size,
      product: {
        connect: {
          id: dto.productId,
        },
      },
      cart: {
        connect: {
          id: id,
        },
      },
    };
    await this.findById(id);
    return this.prisma.productCart.update({
      where: { id },
      data,
    });
  }
}

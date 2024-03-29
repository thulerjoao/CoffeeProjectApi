import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handleError';
import { CreateProductCartDto } from './dto/create.productCart.dto';
import { UpdateProductCartDto } from './dto/update.productCart.dto';
import { ProductCart } from './entities/product-cart.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductCartService {
  private productCartSelect = {
    id: true,
    size: true,
    amount: true,
    productId: true,
  };

  constructor(private readonly prisma: PrismaService) {}

  findAll(cartId: string) {
    return this.prisma.productCart.findMany({
      where: { cartId },
      select: this.productCartSelect,
    });
  }

  async findById(id: string): Promise<ProductCart> {
    const data = await this.prisma.productCart.findUnique({ where: { id } });
    if (!data) {
      throw new BadRequestException(`Unavailable ID`);
    }
    return data;
  }

  async create(
    cartId: string,
    dto: CreateProductCartDto,
  ): Promise<ProductCart> {
    const data: Prisma.ProductCartCreateInput = {
      amount: dto.amount,
      size: dto.size,
      basePrice: dto.basePrice,
      product: {
        connect: {
          id: dto.productId,
        },
      },
      cart: {
        connect: {
          id: cartId,
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
    const data: Partial<UpdateProductCartDto> = {
      amount: dto.amount,
      size: dto.size,
    };
    await this.findById(id);
    return this.prisma.productCart.update({
      where: { id },
      data,
    });
  }
}

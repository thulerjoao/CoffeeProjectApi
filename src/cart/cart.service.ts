import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handleError';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  private cartSelect = {
    id: true,
    productCart: true,
    totalValue: true,
    user: {
      select: {
        id: true,
      },
    },
    createdAt: true,
    updatedAt: true,
  };

  findAll() {
    return this.prisma.cart.findMany();
  }

  async findById(id: string): Promise<Cart> {
    const data = await this.prisma.cart.findUnique({
      where: { id },
      select: this.cartSelect,
    });
    if (!data) {
      throw new BadRequestException(`Unavailable ID`);
    }
    return data;
  }

  async delete(id: string): Promise<void> {
    await this.findById(id);
    await this.prisma.cart.delete({ where: { id } }).catch(handleError);
  }

  async update(id: string, dto: UpdateCartDto): Promise<Cart> {
    const data: Partial<Prisma.CartCreateInput> = {
      products: {
        createMany: {
          data: dto.products.map((element) => ({
            size: element.size,
            amount: element.amount,
            productId: element.productId,
          })),
        },
      },
      totalValue: dto.totalValue,
    };
    await this.findById(id);
    return this.prisma.cart.update({
      where: { id },
      data,
    });
  }
}

// const data: Prisma.CartCreateInput = {
//   ...dto,
//   totalValue: 0,
//   products: {
//     createMany: {
//       data:
//     }
//   }
// }

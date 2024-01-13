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
    products: true,
    user: {
      select: {
        id: true,
      },
    },
  };

  findAll() {
    return this.prisma.cart.findMany();
  }

  handleTotal = (products) => {
    const subtototal = products.map((product) => {
      const amount = product.amount || 0;
      const value = product.basePrice || 0;
      return amount * value;
    });
    const totalValue = subtototal.reduce((acc, subtotal) => acc + subtotal, 0);
    return totalValue;
  };

  async getTotalValue(cartId: string) {
    const cartItens = await this.findById(cartId);
    const totalPrice = this.handleTotal(cartItens.products);
    const response = {
      totalPrice,
    };
    // this.update(cartId, { totalValue: totalPrice });
    return response;
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
            basePrice: element.basePrice,
            productId: element.productId,
          })),
        },
      },
    };
    await this.findById(id);
    return this.prisma.cart.update({
      where: { id },
      data,
    });
  }
}

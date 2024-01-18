import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
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
}

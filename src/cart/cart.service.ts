import { BadRequestException, Injectable } from '@nestjs/common';
import { Cart } from './entities/cart.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { handleError } from 'src/utils/handleError';

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

  async create(dto: CreateCartDto): Promise<Cart> {
    const data: Cart = { ...dto, totalValue: 0 };
    await this.prisma.cart.create({ data }).catch(handleError);
    return data;
  }

  async delete(id: string): Promise<void> {
    await this.findById(id);
    await this.prisma.cart.delete({ where: { id } }).catch(handleError);
  }

  async update(id: string, dto: UpdateCartDto): Promise<Cart> {
    const data: Partial<Cart> = { ...dto };
    await this.findById(id);
    return this.prisma.cart.update({
      where: { id },
      data,
    });
  }
}

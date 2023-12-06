import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handleError';
import { CreateProductCartDto } from './dto/create.productCart.dto';
import { UpdateProductCartDto } from './dto/update.productCart.dto';
import { ProductCart } from './entities/product-cart.entity';

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
    const data: ProductCart = { ...dto };
    await this.prisma.productCart.create({ data }).catch(handleError);
    return data;
  }

  async delete(id: string): Promise<void> {
    await this.findById(id);
    await this.prisma.productCart.delete({ where: { id } }).catch(handleError);
  }

  async update(id: string, dto: UpdateProductCartDto): Promise<ProductCart> {
    const data: Partial<ProductCart> = { ...dto };
    await this.findById(id);
    return this.prisma.productCart.update({
      where: { id },
      data,
    });
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create.product.dto';
// import { UpdateProductDto } from './dto/updates.product.dto';
import { handleError } from 'src/utils/handleError';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.product.findMany();
  }

  async findById(id: string): Promise<Product> {
    const data = await this.prisma.product.findUnique({ where: { id } });
    if (!data) {
      throw new BadRequestException(`Unavailable ID`);
    }
    return data;
  }

  async create(dto: CreateProductDto): Promise<Product> {
    const values = { ...dto };
    delete values.typeId;
    const data: Prisma.ProductCreateInput = {
      ...values,
      type: {
        connect: {
          id: dto.typeId,
        },
      },
    };
    return this.prisma.product.create({ data }).catch(handleError);
  }

  async delete(id: string): Promise<void> {
    await this.findById(id);
    await this.prisma.product.delete({ where: { id } }).catch(handleError);
  }

  // async update(id: string, dto: UpdateProductDto): Promise<Product> {
  //   const data: Partial<Product> = { ...dto };
  //   await this.findById(id);
  //   return this.prisma.product.update({
  //     where: { id },
  //     data,
  //   });
  // }
}

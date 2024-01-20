import { BadRequestException, Injectable } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create.product.dto';
import { UpdateProductDto } from './dto/updates.product.dto';
import { handleError } from 'src/utils/handleError';
import { Prisma } from '@prisma/client';
import { join } from 'path';
import { ProductImageResponse } from 'src/utils/globalTypes';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import * as sharp from 'sharp';
import { serverError } from 'src/utils/serverErro';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  private productSelect = {
    id: true,
    image: true,
    title: true,
    description: true,
    price: true,
    type: {
      select: {
        name: true,
      },
    },
  };

  findAll() {
    return this.prisma.product.findMany({ select: this.productSelect });
  }

  async findById(id: string): Promise<Product> {
    const data = await this.prisma.product.findUnique({
      where: { id },
      select: this.productSelect,
    });
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
    return this.prisma.product
      .create({
        data,
        select: this.productSelect,
      })
      .catch(handleError);
  }

  async delete(id: string): Promise<void> {
    await this.findById(id);
    await this.prisma.product.delete({ where: { id } }).catch(handleError);
  }

  async update(id: string, dto: UpdateProductDto): Promise<Product> {
    await this.findById(id);
    const values = { ...dto };
    delete values.typeId;
    const data: Partial<Prisma.ProductCreateInput> = {
      ...values,
      type: {
        connect: {
          id: dto.typeId,
        },
      },
    };
    console.log(data);
    return this.prisma.product.update({
      where: { id },
      data,
      select: this.productSelect,
    });
  }

  async updateProductImage(
    productImageDto: ProductImageResponse,
  ): Promise<Product> {
    const userUpdated = await this.prisma.product
      .update({
        where: { id: productImageDto.id },
        data: { image: productImageDto.imageUrl },
      })
      .catch(serverError);
    return userUpdated;
  }

  async insertProductPicture(
    productId: string,
    file: Express.Multer.File,
  ): Promise<ProductImageResponse> {
    if (!file) {
      throw new BadRequestException('It is necessary to send a file');
    }
    const productOrNull = await this.findById(productId);
    if (!productOrNull) {
      throw new BadRequestException(`User with id '${productId}' not found`);
    }

    const uploadDir = join(
      __dirname,
      '..',
      '..',
      'uploads',
      'product-image',
      productId,
    );
    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir, { recursive: true });
    }
    const fileName = `${Date.now()}-${file.originalname}`;
    const fileDir = `${uploadDir}/${fileName}`;
    const fileBuffer = await sharp(file.buffer).resize(400, 400).toBuffer();
    writeFileSync(fileDir, fileBuffer);

    const productUpdated = await this.updateProductImage({
      id: productOrNull.id,
      imageUrl: `/product-image/${productId}/${fileName}`,
    });

    return {
      id: productUpdated.id,
      imageUrl: productUpdated.image,
    };
  }
}

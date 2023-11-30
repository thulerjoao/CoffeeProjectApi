import { BadRequestException, Injectable } from '@nestjs/common';
import { Type } from './entities/type.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';

@Injectable()
export class TypeService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.type.findMany();
  }

  async findById(id: string): Promise<Type> {
    const data = await this.prisma.type.findUnique({ where: { id } });
    if (!data) {
      throw new BadRequestException(`Unavailable ID`);
    }
    return data;
  }

  async create(dto: CreateTypeDto): Promise<Type> {
    const data: Type = { ...dto };
    await this.prisma.type.create({ data }).catch();
    return data;
  }

  async delete(id: string): Promise<void> {
    await this.findById(id);
    await this.prisma.type.delete({ where: { id } }).catch();
  }

  async update(id: string, dto: UpdateTypeDto): Promise<Type> {
    const data: Partial<Type> = { ...dto };
    await this.findById(id);
    return this.prisma.type.update({
      where: { id },
      data,
    });
  }
}

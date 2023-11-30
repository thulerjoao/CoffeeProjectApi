import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { handleError } from 'src/utils/handleError';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany();
  }

  async findById(id: string): Promise<User> {
    const data = await this.prisma.user.findUnique({ where: { id } });
    if (!data) {
      throw new BadRequestException(`Unavailable ID`);
    }
    return data;
  }

  async create(dto: CreateUserDto): Promise<User> {
    const data: User = { ...dto };
    await this.prisma.user.create({ data }).catch(handleError);
    return data;
  }

  async delete(id: string): Promise<void> {
    await this.findById(id);
    await this.prisma.user.delete({ where: { id } }).catch(handleError);
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    const data: Partial<User> = { ...dto };
    await this.findById(id);
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }
}

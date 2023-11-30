import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { handleError } from 'src/utils/handleError';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private userSelect = {
    id: true,
    name: true,
    email: true,
    password: false,
    createdAt: true,
    updatedAt: true,
  };

  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany({
      select: this.userSelect,
    });
  }

  async findById(id: string): Promise<User> {
    const data = await this.prisma.user.findUnique({
      where: { id },
      select: this.userSelect,
    });
    if (!data) {
      throw new BadRequestException(`Unavailable ID`);
    }
    return data;
  }

  async create(dto: CreateUserDto): Promise<User> {
    if (dto.confirmPassword !== dto.password) {
      throw new BadRequestException(`Passwords do not march`);
    }
    delete dto.confirmPassword;
    const data: User = {
      ...dto,
      password: await bcrypt.hash(dto.password, 10),
    };
    return this.prisma.user
      .create({ data, select: this.userSelect })
      .catch(handleError);
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
      select: this.userSelect,
    });
  }
}

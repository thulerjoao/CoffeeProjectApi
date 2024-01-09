import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  private authUser = {
    id: true,
    name: true,
    email: true,
    password: true,
    createdAt: false,
    updatedAt: false,
    cart: {
      select: {
        totalValue: true,
        products: {
          select: {
            id: true,
            size: true,
            amount: true,
            productId: true,
          },
        },
      },
    },
  };

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const { password, email } = loginDto;
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: this.authUser,
    });

    if (!user) {
      throw new UnauthorizedException('User or password invalid');
    }

    const isHashValid = bcrypt.compare(password, user.password);

    if (!isHashValid) {
      throw new UnauthorizedException('User or password invalid');
    }

    delete user.password;

    return {
      token: this.jwtService.sign({ email }),
      user,
    };
  }
}

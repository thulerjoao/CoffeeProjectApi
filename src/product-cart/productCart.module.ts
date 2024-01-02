import { Module } from '@nestjs/common';
import { ProductCartService } from './productCart.service';
import { ProductCartController } from './productCart.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [ProductCartController],
  providers: [ProductCartService],
})
export class ProductCartModule {}

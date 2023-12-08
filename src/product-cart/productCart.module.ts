import { Module } from '@nestjs/common';
import { ProductCartService } from './productCart.service';
import { ProductCartController } from './productCart.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProductCartController],
  providers: [ProductCartService],
})
export class ProductCartModule {}

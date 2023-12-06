import { Module } from '@nestjs/common';
import { ProductCartService } from './productCart.service';
import { ProductCartController } from './productCart.controller';

@Module({
  controllers: [ProductCartController],
  providers: [ProductCartService],
})
export class ProductCartModule {}

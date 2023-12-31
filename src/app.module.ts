import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { TypeModule } from './type/type.module';
import { CartModule } from './cart/cart.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProductCartModule } from './product-cart/productCart.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ProductModule,
    UserModule,
    TypeModule,
    CartModule,
    PrismaModule,
    ProductCartModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

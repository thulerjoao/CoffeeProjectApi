import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';
import { ProductCart } from 'src/product-cart/entities/product-cart.entity';

export class CreateCartDto {
  @ApiProperty({
    description: 'list of products',
    example: [],
  })
  products: ProductCart[];

  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'Total Price of the cart',
    example: 0,
  })
  totalValue: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsPositive, ValidateNested } from 'class-validator';
import { CreateProductCartDto } from 'src/product-cart/dto/create.productCart.dto';

export class CreateCartDto {
  @ValidateNested({
    each: true,
  })
  @Type(() => CreateProductCartDto)
  @ApiProperty({
    description: 'list of products',
    type: [CreateProductCartDto],
  })
  products: CreateProductCartDto[];

  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'Total Price of the cart',
    example: 0,
  })
  totalValue: number;
}

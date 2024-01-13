import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
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
}

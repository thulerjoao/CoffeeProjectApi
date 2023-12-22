import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateProductCartDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'size chosed',
    example: 114,
  })
  size: number;

  @IsString()
  @IsUrl()
  @ApiProperty({
    description: 'amount of the same product',
    example: 1,
  })
  amount: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'product id',
    example: '4b3fbbcf-dc17-4474-89f8-289175dc399a',
  })
  productId: string;

  @IsString()
  @ApiProperty({
    description: 'cart id',
    example: 'f358bca8-5b9a-4191-83fe-bbe13b586429',
  })
  cartId: string;
}

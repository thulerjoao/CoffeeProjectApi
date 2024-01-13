import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductCartDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'size chosed',
    example: 114,
  })
  size: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'amount of the same product',
    example: 1,
  })
  amount: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'base price',
    example: 9.9,
  })
  basePrice: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'product id',
    example: '9835adef-b9b8-4640-809f-00914a1893fb',
  })
  productId: string;
}

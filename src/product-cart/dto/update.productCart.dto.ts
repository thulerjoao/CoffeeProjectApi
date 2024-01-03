import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateProductCartDto {
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

  @IsString()
  @ApiProperty({
    description: 'product id (Can let it empty)',
    example: '',
  })
  productId: string;
}

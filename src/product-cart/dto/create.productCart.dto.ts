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
}

// id?: string;
// size: string;
// amount: string;
// product: Product;
// createdAt?: Date;
// updatedAt?: Date;

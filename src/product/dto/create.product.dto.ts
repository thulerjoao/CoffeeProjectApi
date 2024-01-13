import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Name of the product',
    example: 'Coffee Capucchino',
  })
  title: string;

  @IsString()
  @IsUrl()
  @ApiProperty({
    description: 'Product image',
    example: 'http://productimg.com',
  })
  image: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Product description',
    example: 'The best coffee with milk of yor life',
  })
  description: string;

  @IsString()
  @ApiProperty({
    description: 'Type',
    example: '79628d63-7c76-4545-95e2-a551bd43ea40',
  })
  typeId: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Base price',
    example: 9.99,
  })
  price: number;
}

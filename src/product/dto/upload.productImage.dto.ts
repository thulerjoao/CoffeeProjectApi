import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UploadProductImageDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'product Id',
    example: '56fd4f56sd45f8f6d5sa',
  })
  productId: string;
}

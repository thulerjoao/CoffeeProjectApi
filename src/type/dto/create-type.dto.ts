import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTypeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Product type',
    example: 'Tradicional',
  })
  type: string;
}

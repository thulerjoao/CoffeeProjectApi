import { IsNumber, IsPositive } from 'class-validator';

export class CreateCartDto {
  @IsNumber()
  @IsPositive()
  userId: string;

  @IsNumber()
  @IsPositive()
  productId: string;

  @IsNumber()
  @IsPositive()
  size: number;
}

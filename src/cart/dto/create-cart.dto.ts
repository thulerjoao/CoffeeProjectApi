import { IsPositive, IsString } from 'class-validator';

export class CreateCartDto {
  @IsString()
  @IsPositive()
  products: string;
}

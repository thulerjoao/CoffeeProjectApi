import { PartialType } from '@nestjs/swagger';
import { CreateProductCartDto } from './create.productCart.dto';

export class UpdateProductCartDto extends PartialType(CreateProductCartDto) {}

import { Product } from 'src/product/entities/product.entity';

export class ProductCart {
  id?: string;
  size: number;
  amount: number;
  product?: Product;
  createdAt?: Date;
  updatedAt?: Date;
}

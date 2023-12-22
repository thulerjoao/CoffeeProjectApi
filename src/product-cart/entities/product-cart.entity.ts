import { Cart } from 'src/cart/entities/cart.entity';
import { Product } from 'src/product/entities/product.entity';

export class ProductCart {
  id?: string;
  size: number;
  amount: number;
  product?: Product;
  cart?: Cart;
  createdAt?: Date;
  updatedAt?: Date;
}

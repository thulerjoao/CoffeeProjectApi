import { Cart } from 'src/cart/entities/cart.entity';
import { Product } from 'src/product/entities/product.entity';

export class ProductCart {
  id?: string;
  size: number;
  amount: number;
  basePrice: number;
  productId?: string;
  product?: Product;
  cart?: Cart;
  createdAt?: Date;
  updatedAt?: Date;
}

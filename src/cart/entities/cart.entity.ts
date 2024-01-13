import { ProductCart } from 'src/product-cart/entities/product-cart.entity';

export class Cart {
  id?: string;
  products?: ProductCart[];
  createdAt?: Date;
  updatedAt?: Date;
}

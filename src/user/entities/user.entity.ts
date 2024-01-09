import { Cart } from 'src/cart/entities/cart.entity';

export class User {
  id?: string;
  name: string;
  email: string;
  password: string;
  cart?: Cart;
  cartId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class CartProduct {
  productId: string;
  size: number;
  amount: number;
}

export class Cart {
  id?: string;
  userId: string;
  products: CartProduct[];
  createdAt?: Date;
  updatedAt?: Date;
}

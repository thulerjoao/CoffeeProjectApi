import { Injectable } from '@nestjs/common';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  products: Product[] = [];

  getAll() {
    return this.products;
  }
}

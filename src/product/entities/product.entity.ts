import { Type } from 'src/type/entities/type.entity';

export class Product {
  id?: string;
  title: string;
  image?: string;
  type?: Type;
  price: number;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

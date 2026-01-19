import { Product } from '../models/product.model';

export interface ProductRepository {
  getAll(): Promise<{ data: Product[]}>;

  delete(id: string): Promise<void>;
}

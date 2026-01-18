import { Product } from '../models/product.model';

export interface ProductRepository {
  getAll(params: {
    page: number;
    limit: number;
    search: string;
  }): Promise<{ data: Product[]; total: number }>;

  delete(id: string): Promise<void>;
}

import { Product } from '../models/product.model';

export interface ProductRepository {
  getAll(): Promise<{ data: Product[] }>;

  get(id: string): Promise<Product>;

  verifyId(id: string): Promise<boolean>;

  delete(id: string): Promise<{message:string}>;

  create(product: Product): Promise<{data:Product; message:string}>;

  update(product: Product): Promise<{data:Product; message:string}>;
}

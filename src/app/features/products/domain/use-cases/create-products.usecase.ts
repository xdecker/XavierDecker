import { ProductRepository } from '../repositories/product.repository';
import { Product } from '../models/product.model';

export class CreateProductUseCase {
  constructor(private repository: ProductRepository) {}

  execute(product: Product) {
    return this.repository.create(product);
  }
}

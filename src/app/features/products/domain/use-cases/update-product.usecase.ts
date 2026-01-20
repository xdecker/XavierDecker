import { ProductRepository } from '../repositories/product.repository';
import { Product } from '../models/product.model';

export class UpdateProductUseCase {
  constructor(private repository: ProductRepository) {}

  execute(product: Product) {
    return this.repository.update(product);
  }
}

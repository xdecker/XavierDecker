
import { ProductRepository } from '../repositories/product.repository';

export class DeleteProductUseCase {
  constructor(private repository: ProductRepository) {}

  execute(id: string) {
    return this.repository.delete(id);
  }
}

import { ProductRepository } from '../repositories/product.repository';

export class GetProductsUseCase {
  constructor(private repository: ProductRepository) {}

  execute(params: { page: number; limit: number; search: string }) {
    return this.repository.getAll(params);
  }
}

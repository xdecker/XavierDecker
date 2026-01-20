import { ProductRepository } from '../repositories/product.repository';

export class VerifyIdentifierUseCase {
  constructor(private repository: ProductRepository) {}

  execute(id: string) {
    return this.repository.verifyId(id);
  }
}

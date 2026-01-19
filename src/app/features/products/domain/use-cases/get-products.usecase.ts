
import { ProductRepository } from '../repositories/product.repository';


export class GetProductsUseCase {
  constructor(

    private repository: ProductRepository
  ) {}

  execute() {
    return this.repository.getAll();
  }
}

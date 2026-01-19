import { Inject, Injectable } from '@angular/core';
import { ProductRepository } from '../repositories/product.repository';
import { PRODUCT_REPOSITORY } from '../tokens/product-repository.token';

@Injectable()
export class GetProductsUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private repository: ProductRepository
  ) {}

  execute() {
    return this.repository.getAll();
  }
}

// src/app/features/products/application/services/products.service.ts
import { Injectable, Inject } from '@angular/core';
import { GetProductsUseCase } from '../../domain/use-cases/get-products.usecase';
import { PRODUCT_REPOSITORY } from '../../domain/tokens/product-repository.token';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { DeleteProductUseCase } from '../../domain/use-cases/delete-product.usecase';
import { GetProductUseCase } from '../../domain/use-cases/get-product.usecase';
import { CreateProductUseCase } from '../../domain/use-cases/create-products.usecase';
import { UpdateProductUseCase } from '../../domain/use-cases/update-product.usecase';
import { VerifyIdentifierUseCase } from '../../domain/use-cases/verify-identifier.usecase';
import { Product } from '../../domain/models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private getProductsUseCase: GetProductsUseCase;
  private deleteProductUseCase: DeleteProductUseCase;
  private getProductUseCase: GetProductUseCase;
  private createProductUseCase: CreateProductUseCase;
  private updateProductUseCase: UpdateProductUseCase;
  private verifyIdentifierUseCase: VerifyIdentifierUseCase;

  constructor(@Inject(PRODUCT_REPOSITORY) private repo: ProductRepository) {
    this.getProductsUseCase = new GetProductsUseCase(repo);
    this.deleteProductUseCase = new DeleteProductUseCase(repo);
    this.getProductUseCase = new GetProductUseCase(repo);
    this.createProductUseCase = new CreateProductUseCase(repo);
    this.updateProductUseCase = new UpdateProductUseCase(repo);
    this.verifyIdentifierUseCase = new VerifyIdentifierUseCase(repo);
  }

  executeGetProducts() {
    return this.getProductsUseCase.execute();
  }

  executeGetProduct(id: string) {
    return this.getProductUseCase.execute(id);
  }

  executeDeleteProducts(id: string) {
    return this.deleteProductUseCase.execute(id);
  }

  executeCreateProduct(product: Product) {
    return this.createProductUseCase.execute(product);
  }

  executeUpdateProduct(product: Product) {
    return this.updateProductUseCase.execute(product);
  }

  executeVerifyIdentifierProduct(id: string) {
    return this.verifyIdentifierUseCase.execute(id);
  }
}

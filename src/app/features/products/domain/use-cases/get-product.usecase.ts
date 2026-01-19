import { Inject, Injectable } from "@angular/core";
import { ProductRepository } from "../repositories/product.repository";
import { PRODUCT_REPOSITORY } from "../tokens/product-repository.token";


export class GetProductUseCase {
  constructor(

    private repository: ProductRepository
  ) {}

  execute(id:string) {
    return this.repository.get(id);
  }
}

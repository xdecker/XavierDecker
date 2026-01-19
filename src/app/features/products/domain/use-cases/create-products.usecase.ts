import { Inject, Injectable } from "@angular/core";
import { PRODUCT_REPOSITORY } from "../tokens/product-repository.token";
import { ProductRepository } from "../repositories/product.repository";
import { Product } from "../models/product.model";

@Injectable()
export class CreateProductUseCase {
    constructor(
        @Inject(PRODUCT_REPOSITORY)
        private repository: ProductRepository
    ){}

    execute(product: Product){
        return this.repository.create(product)
    }
}
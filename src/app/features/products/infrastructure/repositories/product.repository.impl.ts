import { Injectable } from '@angular/core';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { Product } from '../../domain/models/product.model';
import { ProductApi } from '../api/product.api';
import { firstValueFrom, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductRepositoryImpl implements ProductRepository {
  constructor(private api: ProductApi) {}

  async getAll(): Promise<{ data: Product[] }> {
    return firstValueFrom(this.api.getProducts());
  }

  async get(id: string): Promise<Product> {
    return firstValueFrom(this.api.getProduct(id));
  }

  async verifyId(id: string): Promise<boolean> {
    return firstValueFrom(this.api.verifyIdentifier(id));
  }

  async delete(id: string): Promise<{ message: string }> {
    return firstValueFrom(this.api.deleteProduct(id));
  }

  async create(product: Product): Promise<{ data: Product; message: string }> {
    return firstValueFrom(this.api.createProduct(product));
  }

  async update(product: Product): Promise<{ data: Product; message: string }> {
    return firstValueFrom(this.api.updateProduct(product));
  }
}

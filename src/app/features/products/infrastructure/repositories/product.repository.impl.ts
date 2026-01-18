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

  async getAll(params: {
    page: number;
    limit: number;
    search: string;
  }): Promise<{ data: Product[]; total: number }> {
    return firstValueFrom(this.api.getProducts(params));
  }

  async delete(id: string): Promise<void> {
    await firstValueFrom(this.api.deleteProduct(id));
  }
}

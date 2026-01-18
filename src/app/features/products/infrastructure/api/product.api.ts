import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../domain/models/product.model';

export interface ProductResponse {
  data: Product[];
  total: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductApi {
  private readonly baseUrl = '/products';

  constructor(private http: HttpClient) {}

  getProducts(params: { page: number; limit: number; search: string }) {
    let httpParams = new HttpParams()
      .set('page', params.page)
      .set('limit', params.limit)
      .set('search', params.search);

    return this.http.get<{ data: Product[]; total: number }>(this.baseUrl, {
      params: httpParams,
    });
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../domain/models/product.model';
import { environment } from '../../../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class ProductApi {
  private readonly baseUrl = environment.apiUrl + 'products';

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<{ data: Product[] }>(this.baseUrl);
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  verifyIdentifier(id: string) {
    return this.http.get<boolean>(`${this.baseUrl}/verification/${id}`);
  }

  deleteProduct(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/${id}`);
  }

  createProduct(product: Product) {
    return this.http.post<{ data: Product; message: string }>(
      this.baseUrl,
      product
    );
  }

  updateProduct(product: Product) {
    return this.http.put<{ data: Product; message: string }>(
      `${this.baseUrl}/${product.id}`,
      product
    );
  }
}

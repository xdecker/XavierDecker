import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../domain/models/product.model';
import { environment } from '../../../../../environments/environment';

export interface ProductResponse {
  data: Product[];
  total: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductApi {
  private readonly baseUrl = environment.apiUrl + 'products';

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<{ data: Product[]; total: number }>(this.baseUrl);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

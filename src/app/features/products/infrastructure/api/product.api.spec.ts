import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ProductApi } from './product.api';
import { environment } from '../../../../../environments/environment';
import { Product } from '../../domain/models/product.model';

describe('ProductApi', () => {
  let service: ProductApi;
  let httpMock: HttpTestingController;
  const baseUrl = environment.apiUrl + 'products';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductApi],
    });

    service = TestBed.inject(ProductApi);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getProducts should call GET /products', () => {
    service.getProducts().subscribe();

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('GET');
    req.flush({ data: [] });
  });

  it('getProduct should call GET /products/:id', () => {
    const id = 'P001';
    service.getProduct(id).subscribe();

    const req = httpMock.expectOne(`${baseUrl}/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush({ id });
  });

  it('verifyIdentifier should call GET /products/verification/:id', () => {
    const id = 'P002';
    service.verifyIdentifier(id).subscribe();

    const req = httpMock.expectOne(`${baseUrl}/verification/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(true);
  });

  it('deleteProduct should call DELETE /products/:id', () => {
    const id = 'P003';
    service.deleteProduct(id).subscribe();

    const req = httpMock.expectOne(`${baseUrl}/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({ message: 'Deleted' });
  });

  it('createProduct should call POST /products', () => {
    const product: Product = {
      id: 'P004',
      name: 'Test',
      description: '',
      logo: '',
      date_release: '',
      date_revision: '',
    };
    service.createProduct(product).subscribe();

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(product);
    req.flush({ data: product, message: 'Created' });
  });

  it('updateProduct should call PUT /products/:id', () => {
    const product: Product = {
      id: 'P005',
      name: 'Update',
      description: '',
      logo: '',
      date_release: '',
      date_revision: '',
    };
    service.updateProduct(product).subscribe();

    const req = httpMock.expectOne(`${baseUrl}/${product.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(product);
    req.flush({ data: product, message: 'Updated' });
  });
});

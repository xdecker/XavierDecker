import { TestBed } from '@angular/core/testing';
import { ProductsService } from './products.service';
import { PRODUCT_REPOSITORY } from '../../domain/tokens/product-repository.token';
import { Product } from '../../domain/models/product.model';

describe('ProductsService', () => {
  let service: ProductsService;
  const mockRepo = {
    getAll: jasmine.createSpy('getAll').and.returnValue(Promise.resolve([])),
    get: jasmine
      .createSpy('get')
      .and.returnValue(Promise.resolve({ id: 'P001' } as Product)),
    create: jasmine.createSpy('create').and.returnValue(Promise.resolve({})),
    update: jasmine.createSpy('update').and.returnValue(Promise.resolve({})),
    delete: jasmine.createSpy('delete').and.returnValue(Promise.resolve({})),
    verifyId: jasmine
      .createSpy('verifyId')
      .and.returnValue(Promise.resolve(false)),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductsService,
        { provide: PRODUCT_REPOSITORY, useValue: mockRepo },
      ],
    });
    service = TestBed.inject(ProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call all execute methods', async () => {
    await service.executeGetProducts();
    expect(mockRepo.getAll).toHaveBeenCalled();

    await service.executeGetProduct('P001');
    expect(mockRepo.get).toHaveBeenCalledWith('P001');

    await service.executeCreateProduct({ id: 'P002' } as Product);
    expect(mockRepo.create).toHaveBeenCalled();

    await service.executeUpdateProduct({ id: 'P002' } as Product);
    expect(mockRepo.update).toHaveBeenCalled();

    await service.executeDeleteProducts('P002');
    expect(mockRepo.delete).toHaveBeenCalledWith('P002');

    await service.executeVerifyIdentifierProduct('P003');
    expect(mockRepo.verifyId).toHaveBeenCalledWith('P003');
  });
});

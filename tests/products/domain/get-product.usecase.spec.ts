import { GetProductUseCase } from '../../../src/app/features/products/domain/use-cases/get-product.usecase';
import { Product } from '../../../src/app/features/products/domain/models/product.model';

describe('GetProductUseCase', () => {
  let useCase: GetProductUseCase;

  const mockRepo = {
    get: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useCase = new GetProductUseCase(mockRepo as any);
  });

  it('should return a product by id', async () => {
    const fakeProduct: Product = {
      id: 'P001',
      name: 'Producto Test',
      description: 'Desc Test',
      logo: 'logo.png',
      date_release: '2026-01-18',
      date_revision: '2027-01-18',
    };

    mockRepo.get.mockResolvedValue(fakeProduct);

    const result = await useCase.execute('P001');

    expect(mockRepo.get).toHaveBeenCalledWith('P001');
    expect(result).toEqual(fakeProduct);
  });
});

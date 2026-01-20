import { GetProductsUseCase } from '../../../src/app/features/products/domain/use-cases/get-products.usecase';
import { Product } from '../../../src/app/features/products/domain/models/product.model';

const mockRepo = {
  getAll: jest.fn(),
};

describe('GetProductsUseCase', () => {
  let useCase: GetProductsUseCase;

  beforeEach(() => {
    useCase = new GetProductsUseCase(mockRepo as any);
  });

  it('should return a list of products', async () => {
    const fakeProducts: Product[] = [
      {
        id: 'P001',
        name: 'Producto Test',
        description: 'Desc Test',
        logo: 'logo.png',
        date_release: '2026-01-18',
        date_revision: '2027-01-18',
      },
      {
        id: 'P002',
        name: 'Otro Producto',
        description: 'Desc 2',
        logo: 'logo2.png',
        date_release: '2026-01-18',
        date_revision: '2027-01-18',
      },
    ];

    mockRepo.getAll.mockResolvedValue({ data: fakeProducts });

    const result = await useCase.execute();

    expect(result).toEqual({ data: fakeProducts });
    expect(mockRepo.getAll).toHaveBeenCalled();
  });

  it('should handle empty list', async () => {
    mockRepo.getAll.mockResolvedValue({ data: [] });

    const result = await useCase.execute();

    expect(result).toEqual({ data: [] });
    expect(mockRepo.getAll).toHaveBeenCalled();
  });
});

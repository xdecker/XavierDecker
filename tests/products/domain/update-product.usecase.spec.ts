import { UpdateProductUseCase } from '../../../src/app/features/products/domain/use-cases/update-product.usecase';
import { Product } from '../../../src/app/features/products/domain/models/product.model';

describe('UpdateProductUseCase', () => {
  let useCase: UpdateProductUseCase;

  const mockRepo = {
    update: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useCase = new UpdateProductUseCase(mockRepo as any);
  });

  it('should update product data without changing the id', async () => {
    const product: Product = {
      id: 'P001',
      name: 'Producto Actualizado',
      description: 'Nueva descripción',
      logo: 'logo-new.png',
      date_release: '2026-01-18',
      date_revision: '2027-01-18',
    };

    const response = {
      data: product,
      message: 'Producto actualizado correctamente',
    };

    mockRepo.update.mockResolvedValue(response);

    const result = await useCase.execute(product);

    expect(mockRepo.update).toHaveBeenCalledWith(product);
    expect(result).toEqual(response);
    expect(result.data.id).toBe('P001');
  });
});

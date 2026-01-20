import { CreateProductUseCase } from './create-products.usecase';
import { Product } from '../models/product.model';

describe('CreateProductUseCase', () => {
  let useCase: CreateProductUseCase;

  const mockRepo = {
    create: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useCase = new CreateProductUseCase(mockRepo as any);
  });

  it('should create a product and return data and message', async () => {
    const product: Product = {
      id: 'P001',
      name: 'Producto Test',
      description: 'Desc Test',
      logo: 'logo.png',
      date_release: '2026-01-18',
      date_revision: '2027-01-18',
    };

    const response = {
      data: product,
      message: 'Producto creado correctamente',
    };

    mockRepo.create.mockResolvedValue(response);

    const result = await useCase.execute(product);

    expect(mockRepo.create).toHaveBeenCalledWith(product);
    expect(result).toEqual(response);
  });

  it('should throw error when backend returns bad request', async () => {
    mockRepo.create.mockRejectedValue({
      name: 'BadRequestError',
      message: 'Invalid body, check errors property for more info.',
      status: 400,
    });

    try {
      const product: Product = {
        id: 'P1',
        name: 'abc',
        description: 'descripcion valida',
        logo: 'logo.png',
        date_release: '2026-01-01',
        date_revision: '2027-01-01',
      };
      await useCase.execute(product);
      fail('Expected error was not thrown');
    } catch (error: any) {
      expect(error.name).toBe('BadRequestError');
      expect(error.message).toContain('Invalid body');
      expect(error.status).toBe(400);
    }
  });
});

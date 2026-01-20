import { DeleteProductUseCase } from './delete-product.usecase';

describe('DeleteProductUseCase', () => {
  let useCase: DeleteProductUseCase;

  const mockRepo = {
    delete: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useCase = new DeleteProductUseCase(mockRepo as any);
  });

  it('should delete a product by id', async () => {
    const response = { message: 'Producto eliminado correctamente' };

    mockRepo.delete.mockResolvedValue(response);

    const result = await useCase.execute('P001');

    expect(mockRepo.delete).toHaveBeenCalledWith('P001');
    expect(result).toEqual(response);
  });

  it('should propagate NotFoundError when product does not exist', async () => {
    mockRepo.delete.mockRejectedValue({
      name: 'NotFoundError',
      message: 'Product not found',
      status: 404,
    });

    try {
      await useCase.execute('P999');
      fail('Expected error was not thrown');
    } catch (error: any) {
      expect(error.name).toBe('NotFoundError');
      expect(error.status).toBe(404);
      expect(error.message).toContain('not found');
    }

    expect(mockRepo.delete).toHaveBeenCalledWith('P999');
  });
});

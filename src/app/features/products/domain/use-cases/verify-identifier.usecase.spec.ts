import { VerifyIdentifierUseCase } from './verify-identifier.usecase';

describe('VerifyIdentifierUseCase', () => {
  let useCase: VerifyIdentifierUseCase;

  const mockRepo = {
    verifyId: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useCase = new VerifyIdentifierUseCase(mockRepo as any);
  });

  it('should return true when identifier exists', async () => {
    mockRepo.verifyId.mockResolvedValue(true);

    const result = await useCase.execute('P001');

    expect(mockRepo.verifyId).toHaveBeenCalledWith('P001');
    expect(result).toBe(true);
  });

  it('should return false when identifier does not exist', async () => {
    mockRepo.verifyId.mockResolvedValue(false);

    const result = await useCase.execute('P999');

    expect(mockRepo.verifyId).toHaveBeenCalledWith('P999');
    expect(result).toBe(false);
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { PastTransactionService } from './past-transaction.service';

describe('PastTransactionService', () => {
  let service: PastTransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PastTransactionService],
    }).compile();

    service = module.get<PastTransactionService>(PastTransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

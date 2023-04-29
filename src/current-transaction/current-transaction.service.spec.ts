import { Test, TestingModule } from '@nestjs/testing';
import { CurrentTransactionService } from './current-transaction.service';

describe('CurrentTransactionService', () => {
  let service: CurrentTransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CurrentTransactionService],
    }).compile();

    service = module.get<CurrentTransactionService>(CurrentTransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
